import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/cotizador')({
  component: Cotizador,
})

function Cotizador() {
  return (
    <div style={{ padding: 20 }}>
      <h1>COTIZADOR CARGÓ CORRECTAMENTE</h1>
    </div>
  )
}
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  Plus, Minus, ShoppingCart, FileText, Send, CheckCircle, Package, ArrowRight, 
  Trash2, Landmark, RefreshCcw, ExternalLink, ShieldCheck, Zap, HardDrive, MapPin
} from 'lucide-react';
import { jsPDF } from "jspdf";
import { APIProvider, Map, MapControl, ControlPosition, AdvancedMarker } from '@vis.gl/react-google-maps';
import { Product, ProviderSettings, Project, QuoteItem } from '../types';

interface QuoterProps {
  products: Product[];
  settings: ProviderSettings;
  projects: Project[];
  onAddProject: (newProject: Omit<Project, 'id' | 'date'>) => Promise<Project>;
  onPlaceProviderOrder: (projectId: string, items: any[], totalCost: number) => Promise<any>;
}

export default function Quoter({
  products,
  settings,
  projects,
  onAddProject,
  onPlaceProviderOrder
}: QuoterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Quote State
  const [cart, setCart] = useState<QuoteItem[]>([]);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [projectName, setProjectName] = useState('');
  const [notes, setNotes] = useState('');

  // Google Maps Project Address and Property Measure
  const [projectAddress, setProjectAddress] = useState('');
  const [mapCenter, setMapCenter] = useState({ lat: 17.9892, lng: -92.9475 }); // Default Tabasco/Sur area
  const [mapZoom, setMapZoom] = useState(13);
  const [polygonPath, setPolygonPath] = useState<{lat: number; lng: number}[]>([]);
  
  // Offline simulated dimensions
  const [simWidth, setSimWidth] = useState<number>(15);
  const [simLength, setSimLength] = useState<number>(20);
  const [simArea, setSimArea] = useState<number>(300);

  // Fallback simple haversine distance indicator between two lat/lng points to avoid strict geometry library dependency
  const getDistancePoints = (p1: {lat: number; lng: number}, p2: {lat: number; lng: number}) => {
    const R = 6371e3; // metres
    const phi1 = p1.lat * Math.PI/180;
    const phi2 = p2.lat * Math.PI/180;
    const dPhi = (p2.lat-p1.lat) * Math.PI/180;
    const dLambda = (p2.lng-p1.lng) * Math.PI/180;

    const a = Math.sin(dPhi/2) * Math.sin(dPhi/2) +
              Math.cos(phi1) * Math.cos(phi2) *
              Math.sin(dLambda/2) * Math.sin(dLambda/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; // in metres
  };

  const calculatePolygonAreaAndPerimeter = (path: {lat: number; lng: number}[]) => {
    if (path.length < 3) return { area: 0, perimeter: 0 };
    
    // Perimeter calculation
    let perm = 0;
    for (let i = 0; i < path.length; i++) {
      const nextIdx = (i + 1) % path.length;
      perm += getDistancePoints(path[i], path[nextIdx]);
    }
    
    // Coordinate translation to flat local meters centered around the first point for planar polygon area
    const p0 = path[0];
    const pointsMeters = path.map(p => {
      const dy = (p.lat - p0.lat) * 111320;
      const dx = (p.lng - p0.lng) * 40075000 * Math.cos(p0.lat * Math.PI / 180) / 360;
      return { x: dx, y: dy };
    });
    
    // Shoelace formula for polygon area
    let areaDouble = 0;
    const n = pointsMeters.length;
    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n;
      areaDouble += (pointsMeters[i].x * pointsMeters[j].y) - (pointsMeters[j].x * pointsMeters[i].y);
    }
    
    return {
      area: Math.abs(areaDouble / 2),
      perimeter: perm
    };
  };

  // Computed polygon state
  const measuredMetrics = calculatePolygonAreaAndPerimeter(polygonPath);
  const measuredArea = measuredMetrics.area;
  const measuredPerimeter = measuredMetrics.perimeter;

  // Clear or reset points
  const clearMapMarkers = () => {
    setPolygonPath([]);
  };

  // Handle map center click to add polygon corner point
  const handleMapClick = (e: any) => {
    if (e.detail?.latLng) {
      setPolygonPath(prev => [...prev, { lat: e.detail.latLng.lat, lng: e.detail.latLng.lng }]);
    }
  };

  // API Key Checks
  const API_KEY =
    process.env.GOOGLE_MAPS_PLATFORM_KEY ||
    (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
    (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
    '';
  const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY' && API_KEY !== '';

  const handleSearchAddressOnMap = () => {
    if (!projectAddress || !hasValidKey) return;
    if (typeof google === 'undefined') {
      alert("Espera un momento a que las librerías de Google Maps se inicialicen.");
      return;
    }
    try {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: projectAddress }, (results, status) => {
        if (status === 'OK' && results && results[0]) {
          const loc = results[0].geometry.location;
          const newCenter = { lat: loc.lat(), lng: loc.lng() };
          setMapCenter(newCenter);
          setMapZoom(19); // satellite view zoom
          
          // Place small boundary template to guide
          const delta = 0.00015;
          setPolygonPath([
            { lat: loc.lat() - delta, lng: loc.lng() - delta },
            { lat: loc.lat() + delta, lng: loc.lng() - delta },
            { lat: loc.lat() + delta, lng: loc.lng() + delta },
            { lat: loc.lat() - delta, lng: loc.lng() + delta }
          ]);
        } else {
          alert("No se pudo hallar esa dirección precisa en el mapa de Google. Intenta agregando más referencias.");
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Selected existing project state (for linking deposit/order)
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');

  // Succeeded states
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState<string>('');
  const [requestSuccess, setRequestSuccess] = useState<boolean>(false);

  // Nuevas configuraciones de cotización contratada
  const [isOutsideMetro, setIsOutsideMetro] = useState<boolean>(false);

  // Calculadora de Almacenamiento Inteligente (CCTV HDD Storage Calculator)
  const [calcCameras, setCalcCameras] = useState<number>(4);
  const [calcResolution, setCalcResolution] = useState<'2mp' | '4mp' | '8mp'>('2mp');
  const [calcDays, setCalcDays] = useState<number>(15);
  const [calcCompression, setCalcCompression] = useState<'h265' | 'h264'>('h265');

  // CCTV Storage calculation formulas matching standard CCTV calculator formulas
  const getDailyGB = () => {
    if (calcResolution === '2mp') {
      return calcCompression === 'h265' ? 12 : 25;
    } else if (calcResolution === '4mp') {
      return calcCompression === 'h265' ? 20 : 50;
    } else { // 8mp
      return calcCompression === 'h265' ? 35 : 100;
    }
  };

  const calculatedGB = calcCameras * getDailyGB() * calcDays;
  const calculatedTB = parseFloat((calculatedGB / 1024).toFixed(2));

  // Determine which hard disk to suggest
  const getRecommendedHDD = () => {
    if (calculatedTB <= 1.0) {
      return products.find(p => p.sku === 'WD10PURZ');
    } else if (calculatedTB > 1.0 && calculatedTB <= 2.2) {
      return products.find(p => p.sku === 'WD22PURZ');
    } else {
      return products.find(p => p.sku === 'ST4000VX016');
    }
  };

  const recommendedHDD = getRecommendedHDD() || products.find(p => p.type === 'hdd');

  const filteredProducts = products.filter(p => {
    const matchesCat = selectedCategory === 'all' || 
                       p.type === selectedCategory ||
                       (selectedCategory === 'kits_and_accessories' && (p.type === 'dahua_kit' || p.type === 'accessory'));
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.sku.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const addToCart = (product: Product) => {
    const exists = cart.find(item => item.product.id === product.id);
    if (exists) {
      setCart(cart.map(item => 
        item.product.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(cart.map(item => {
      if (item.product.id === productId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean) as QuoteItem[]);
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.product.id !== productId));
  };

  // Calculations
  const totalCamerasCount = cart.reduce((sum, item) => {
    if (item.product.type === 'dahua_kit') {
      return sum + (item.quantity * 4);
    }
    if (['analog', 'ip'].includes(item.product.type)) {
      return sum + item.quantity;
    }
    return sum;
  }, 0);

  const totalAnalogCameras = cart.reduce((sum, item) => {
    if (item.product.type === 'dahua_kit') {
      return sum + (item.quantity * 4);
    }
    if (item.product.type === 'analog') {
      return sum + item.quantity;
    }
    return sum;
  }, 0);

  const getPowerSupplyChannels = (camerasCount: number) => {
    if (camerasCount <= 0) return 0;
    if (camerasCount <= 4) return 4;
    if (camerasCount <= 8) return 8;
    if (camerasCount <= 16) return 16;
    return 32;
  };

  const powerSupplyChannels = getPowerSupplyChannels(totalAnalogCameras);

  // Auto-added components list for our UI and PDF:
  const getAutoAddedMaterials = () => {
    const list: { sku: string; name: string; quantity: number | string; type: string; categoryDescription: string; description: string }[] = [];
    
    // 1. Recommended Hard Drive automatically from calculator
    if (recommendedHDD) {
      list.push({
        sku: recommendedHDD.sku,
        name: recommendedHDD.name,
        quantity: 1,
        type: 'hdd',
        categoryDescription: 'Disco Duro de Resguardo',
        description: 'Disco duro especial para videovigilancia diseñado para grabación continua 24/7'
      });
    }

    // 2. Boxes SAXXON SXWD008 - 1 per total camera selected
    if (totalCamerasCount > 0) {
      list.push({
        sku: 'SAXXON SXWD008',
        name: 'Caja de Protección de Conectores para Intemperie',
        quantity: totalCamerasCount,
        type: 'accessory',
        categoryDescription: 'Protección contra Clima',
        description: 'Caja estanca sellada para evitar humedad y falsos contactos en conectores de intemperie'
      });

      // 3. 30 meters of cabling per camera added
      list.push({
        sku: 'CABLE-CANALIZACION-30M',
        name: 'Metraje de Canalización, Anclaje, Sujeción y Cable de Red/Coaxial',
        quantity: totalCamerasCount * 30,
        type: 'cable',
        categoryDescription: 'Material de Instalación',
        description: 'Tramos de 30 metros de cableado profesional por cámara, incluyendo grapas, taquetes y fijación'
      });
    }

    // 4. If there are analog cameras:
    if (totalAnalogCameras > 0) {
      // transceptores DAHUA PFM800B-4K per camera added
      list.push({
        sku: 'DAHUA PFM800B-4K',
        name: 'Par de Transceptores Pasivos HD Video Balun 4K',
        quantity: totalAnalogCameras,
        type: 'accessory',
        categoryDescription: 'Transmisión de Video',
        description: 'Par de transceptores pasivos para el correcto acoplamiento de video de alta definición'
      });

      // Macho and hembra power connectors
      list.push({
        sku: 'CON-MACHO-12V',
        name: 'Conector Macho de Corriente 12V con Terminal de Tornillo',
        quantity: totalAnalogCameras,
        type: 'accessory',
        categoryDescription: 'Alimentación de Corriente',
        description: 'Conector de corriente macho para alimentar las cámaras analógicas'
      });

      list.push({
        sku: 'CON-HEMBRA-12V',
        name: 'Conector Hembra de Corriente 12V con Terminal de Tornillo',
        quantity: totalAnalogCameras,
        type: 'accessory',
        categoryDescription: 'Alimentación de Corriente',
        description: 'Conector de corriente hembra para conectar al tendido de alimentación de 12V'
      });

      // Fuente de poder (4/8/16/32-channel based on analog counts)
      list.push({
        sku: `PSD-REG-${powerSupplyChannels}CH`,
        name: `Fuente de Poder Regulada Multicanal de ${powerSupplyChannels} Canales de Salida`,
        quantity: 1,
        type: 'power_supply',
        categoryDescription: 'Distribución Eléctrica',
        description: `Fuente de distribución de energía regulada dimensionada para las ${totalAnalogCameras} cámaras analógicas`
      });
    }

    return list;
  };

  const autoAddedMaterials = getAutoAddedMaterials();

  const subtotal = 0;
  const tax = 0;
  const total = 0;
  const totalCostUSD = 0;

  // PDF Generation with Custom Premium styling (Price-Free Technical Specification)
  const generatePDF = () => {
    if (!clientName || cart.length === 0) {
      alert("Por favor introduce el nombre del cliente y agrega productos al carrito para continuar.");
      return;
    }

    const doc = new jsPDF();
    const pid = `CCTV-${Math.floor(1000 + Math.random() * 9000)}`;

    // Draw header decoration
    doc.setFillColor(15, 23, 42); // slate-900 background
    doc.rect(0, 0, 210, 40, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("CCTV DEL SUR", 15, 18);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.text("FICHA DE REQUERIMIENTO TÉCNICO Y ESPECIFICACIÓN DE COMPONENTES", 15, 25);
    doc.text(`CCTV del Sur MX | Folio de Solicitud: ${pid}`, 15, 30);

    // Metadata Right-aligned
    doc.setFontSize(9);
    doc.text(`Fecha: ${new Date().toLocaleDateString('es-MX')}`, 150, 18);
    doc.text(`Estatus: PENDIENTE DE COTIZAR`, 150, 25);

    // Client Info Card
    doc.setFillColor(248, 250, 252); // light background
    doc.rect(15, 45, 180, 34, 'F');
    
    doc.setTextColor(15, 23, 42);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.text("DATOS GENERALES DE LA OBRA Y CLIENTE", 20, 50);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.text(`Cliente: ${clientName}`, 20, 56);
    doc.text(`Proyecto: ${projectName || "Instalación de CCTV"}`, 20, 61);
    doc.text(`WhatsApp de Contacto: ${clientPhone || "Sin registrar"}`, 20, 66);
    
    const finalArea = hasValidKey ? measuredArea : simArea;
    const finalPerimeter = hasValidKey ? measuredPerimeter : (simWidth * 2 + simLength * 2);
    doc.text(`Dirección del Predio: ${projectAddress || "Instalación en Sitio"}`, 20, 71);
    doc.text(`Predio: ${finalArea.toFixed(1)} m² | Perímetro: ${finalPerimeter.toFixed(1)} m | Cableado Asignado: ${(totalCamerasCount * 30)} m`, 20, 76);

    // Table Header
    doc.setFillColor(30, 41, 59); // slate-800
    doc.rect(15, 83, 180, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.text("MODELO / SKU", 18, 88);
    doc.text("COMPONENTE O EQUIPO SOLICITADO", 52, 88);
    doc.text("CANTIDAD", 146, 88);
    doc.text("DETALLE TÉCNICO", 170, 88);

    doc.setTextColor(51, 65, 85);
    doc.setFont("helvetica", "normal");
    let y = 96;

    // Draw Cart Items
    cart.forEach((item, index) => {
      // Shading
      if (index % 2 === 0) {
        doc.setFillColor(241, 245, 249);
        doc.rect(15, y - 4, 180, 7, 'F');
      }

      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.text(item.product.sku.substring(0, 18), 18, y);
      
      doc.setFont("helvetica", "normal");
      const pNameClean = item.product.name.length > 50 ? item.product.name.substring(0, 48) + "..." : item.product.name;
      doc.text(pNameClean, 52, y);
      
      doc.setFont("helvetica", "bold");
      doc.text(`${item.quantity} pza(s)`, 146, y);
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.text(item.product.type.toUpperCase(), 170, y);
      
      y += 7;
    });

    // Draw Auto-Added Items (Accessories, cabling, HDD, transceiver pairs, power boxes)
    autoAddedMaterials.forEach((item, index) => {
      const idx = cart.length + index;
      if (idx % 2 === 0) {
        doc.setFillColor(241, 245, 249);
        doc.rect(15, y - 4, 180, 7, 'F');
      }

      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.text(item.sku.substring(0, 18), 18, y);
      
      doc.setFont("helvetica", "normal");
      const nameClean = item.name.length > 50 ? item.name.substring(0, 48) + "..." : item.name;
      doc.text(nameClean, 52, y);
      
      doc.setFont("helvetica", "bold");
      const qtyText = typeof item.quantity === 'number' ? `${item.quantity} pza(s)` : `${item.quantity}`;
      doc.text(qtyText, 146, y);
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.text(item.categoryDescription.substring(0, 22), 170, y);
      
      y += 7;
    });

    y += 4;
    doc.setDrawColor(226, 232, 240);
    doc.line(15, y, 195, y);
    y += 6;

    // Warning / Accommodation Disclaimer outside metropolitana block
    if (isOutsideMetro) {
      doc.setFillColor(254, 243, 199); // amber-100
      doc.rect(15, y, 180, 18, 'F');
      doc.setDrawColor(245, 158, 11); // amber-500
      doc.rect(15, y, 180, 18);

      doc.setTextColor(146, 64, 14); // amber-800
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.text("⚠️ AVISO DE UBICACIÓN FUERA DEL ÁREA METROPOLITANA", 20, y + 5);
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.text("Este proyecto se localiza fuera del área de servicio regular. Los viáticos, costos de traslado,", 20, y + 10);
      doc.text("así como hospedaje y alimentación de los técnicos, se cotizarán y presentarán por separado.", 20, y + 14);
      y += 24;
    }

    // SLA / 3 Business Days Response Banner
    doc.setFillColor(236, 253, 245); // emerald-50
    doc.rect(15, y, 180, 26, 'F');
    doc.setDrawColor(16, 185, 129); // emerald-500
    doc.rect(15, y, 180, 26);

    doc.setTextColor(6, 95, 70); // deep green
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.text("ESTATUS: SOLICITUD DE ESPECIFICACIÓN EN PROCESO", 20, y + 6);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text("¡Hemos registrado tu requerimiento técnico! Un asesor especializado de CCTV del Sur analizará", 20, y + 13);
    doc.text("tu predio y se pondrá en contacto contigo en un lapso máximo de 3 días hábiles para entregarte", 20, y + 17);
    doc.text("el presupuesto definitivo con los mejores costos del mercado.", 20, y + 21);

    // Disclaimer Footer
    y += 34;
    doc.setTextColor(100, 116, 139);
    doc.setFont("helvetica", "italic");
    doc.setFontSize(8);
    doc.text("Nota: Los equipos sugeridos quedan reservados en base al stock activo de cctvdelsur.mx.", 15, y);
    doc.text("Esta listado no constituye un cobro o factura legal hasta su aprobación formal.", 15, y + 4);

    doc.save(`Ficha_Especificacion_CCTV_${clientName.replace(/\s+/g, '_')}.pdf`);
  };

  // Create Project in Database
  const handleRegisterProject = async () => {
    if (!clientName || !projectName) {
      alert("Por favor rellena el nombre del proyecto y el cliente.");
      return;
    }

    try {
      const finalArea = hasValidKey ? measuredArea : simArea;
      const finalPerimeter = hasValidKey ? measuredPerimeter : (simWidth * 2 + simLength * 2);
      const mapDetails = `Dirección Obra: ${projectAddress || "Instalación en sitio"}\nMedida Predio: ${finalArea.toFixed(1)} m²\nPerímetro: ${finalPerimeter.toFixed(1)} m\nCable esp: ${(totalCamerasCount * 30)} m`;

      let autoNotes = `[Equipos]: ${totalCamerasCount} cámaras.\n[Ubicación Metropolitana]: ${isOutsideMetro ? "Fuera de Área Metropolitana" : "Dentro de Área Metropolitana"}\n`;
      autoNotes += `[Accesorios Auto-Asignados]:\n`;
      autoAddedMaterials.forEach(m => {
        autoNotes += `- ${m.sku}: ${m.name} (Cant: ${m.quantity})\n`;
      });

      const payload = {
        name: projectName,
        clientName,
        clientPhone: clientPhone || "+52",
        status: "pending" as const,
        camerasCount: totalCamerasCount,
        total: 0,
        notes: notes ? `${notes}\n\n${autoNotes}\n[Google Maps / Predio]:\n${mapDetails}` : `${autoNotes}\n[Google Maps / Predio]:\n${mapDetails}`,
        paymentStatus: "pending" as const
      };
      
      const savedProj = await onAddProject(payload);
      setSelectedProjectId(savedProj.id);
      setRequestSuccess(true);
    } catch (err: any) {
      alert("Error al guardar la solicitud en el servidor.");
    }
  };

  // Simulates ordering parts direct from Epcom/SYSCOM API
  // Using logged in account credentials in backend
  const handlePlaceOrderDirect = async () => {
    const targetProjId = selectedProjectId;
    if (!targetProjId) {
      alert("Debes guardar primero el proyecto o seleccionar uno de la lista para vincular el pedido directo del proveedor.");
      return;
    }

    setIsOrdering(true);
    setOrderConfirmation('');
    try {
      const itemsList = cart.map((item) => ({
        sku: item.product.sku,
        name: item.product.name,
        quantity: item.quantity,
        cost: item.product.cost,
        price: item.product.price
      }));

      const res = await onPlaceProviderOrder(targetProjId, itemsList, totalCostUSD);
      setOrderConfirmation(res.order.providerOrderId);
      setCart([]);
      alert(`¡Pedido formal mandado con éxito al API del proveedor!\n\nNúmero de Pedido Proveedor: ${res.order.providerOrderId}\nSe generó factura de compra para CCTV del Sur y se mandó aviso de estatus vía WhatsApp.`);
    } catch {
      alert("Fallo al autenticar compra directa con el API del proveedor.");
    } finally {
      setIsOrdering(false);
    }
  };

  // Compile pre-filled WhatsApp Link to send to final user
  const handleSendWhatsAppMessage = () => {
    if (!clientPhone) {
      alert("Coloca el teléfono del cliente para mandarle el resumen de especificaciones.");
      return;
    }
    const refId = `CCTV-${Math.floor(100+Math.random()*900)}`;
    const lineBreak = "\n";

    let materialsText = "";
    cart.forEach(item => {
      materialsText += `- ${item.product.sku} x${item.quantity}${lineBreak}`;
    });
    autoAddedMaterials.forEach(item => {
      const qtyText = typeof item.quantity === 'number' ? `x${item.quantity}` : `(${item.quantity})`;
      materialsText += `- ${item.sku} ${qtyText}${lineBreak}`;
    });

    const textToSend = 
      `*CCTV del Sur - Ficha de Requerimientos Técnicos* 📹` + lineBreak +
      `Hola *${clientName}*, se ha generado la especificación técnica para tu proyecto *${projectName || "Seguridad CCTV"}* (Folio: ${refId}):` + lineBreak + lineBreak +
      `*Componentes y Equipos:*` + lineBreak +
      materialsText + lineBreak +
      (isOutsideMetro ? `⚠️ *Nota:* Ubicación fuera del área metropolitana. Viáticos y hospedaje se cotizarán por separado.` + lineBreak : "") + lineBreak +
      `*Tiempo de Respuesta:* Un asesor técnico se contactará en un plazo máximo de *3 días hábiles* para concertar la cotización final.` + lineBreak + lineBreak +
      `¡Vinculado a cctvdelsur.mx!`;

    const encoded = encodeURIComponent(textToSend);
    window.open(`https://api.whatsapp.com/send?phone=${clientPhone}&text=${encoded}`, '_blank');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* Catalog Search & Product Display - 7 Cols */}
      <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold font-display tracking-tight text-slate-950 flex items-center gap-2 block">
              <Package className="text-red-600 w-5.5 h-5.5" /> Crea tu Sistema de CCTV
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Costos del proveedor sincronizados mediante API. Mostrando precios de venta final con margen aplicado.
            </p>
          </div>
        </div>

        {/* Categories chips filter */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs">
          <button 
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-2 rounded-lg font-semibold transition-all cursor-pointer whitespace-nowrap min-h-[44px] flex items-center ${selectedCategory === 'all' ? 'bg-red-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            Todo
          </button>
          <button 
            type="button"
            onClick={() => setSelectedCategory('analog')}
            className={`px-3 py-2 rounded-lg font-semibold transition-all cursor-pointer whitespace-nowrap min-h-[44px] flex items-center ${selectedCategory === 'analog' ? 'bg-red-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            Analógicas
          </button>
          <button 
            type="button"
            onClick={() => setSelectedCategory('ip')}
            className={`px-3 py-2 rounded-lg font-semibold transition-all cursor-pointer whitespace-nowrap min-h-[44px] flex items-center ${selectedCategory === 'ip' ? 'bg-red-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            Sistemas IP
          </button>
          <button 
            type="button"
            onClick={() => setSelectedCategory('dvr')}
            className={`px-3 py-2 rounded-lg font-semibold transition-all cursor-pointer whitespace-nowrap min-h-[44px] flex items-center ${selectedCategory === 'dvr' ? 'bg-red-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            DVR/Grabadores
          </button>
          <button 
            type="button"
            onClick={() => setSelectedCategory('hdd')}
            className={`px-3 py-2 rounded-lg font-semibold transition-all cursor-pointer whitespace-nowrap min-h-[44px] flex items-center gap-1 ${selectedCategory === 'hdd' ? 'bg-red-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            💾 Discos Duros (Almacenamiento)
          </button>
          <button 
            type="button"
            onClick={() => setSelectedCategory('cable')}
            className={`px-3 py-2 rounded-lg font-semibold transition-all cursor-pointer whitespace-nowrap min-h-[44px] flex items-center ${selectedCategory === 'cable' ? 'bg-red-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            Cableado
          </button>
          <button 
            type="button"
            onClick={() => setSelectedCategory('kits_and_accessories')}
            className={`px-3 py-2 rounded-lg font-semibold transition-all cursor-pointer whitespace-nowrap min-h-[44px] flex items-center gap-1 ${selectedCategory === 'kits_and_accessories' ? 'bg-red-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            🏷️ Kits y Accesorios
          </button>
        </div>

        {/* Search input bar */}
        <input 
          type="text" 
          placeholder="Buscar cámaras o discos por modelo, marca o SKU..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-red-500"
        />

        {/* CALCULADORA DE ALMACENAMIENTO INTELIGENTE (CCTV INTEGRATED STORAGE CALCULATOR) */}
        <div className="bg-slate-900 text-slate-150 p-4.5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2.5">
            <HardDrive className="text-red-500 w-5 h-5 animate-pulse" />
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white font-display">💾 ¿Cuántos días quieres grabar?</h3>
              <p className="text-[10px] text-slate-400">Calcula y recomienda automáticamente el disco duro ideal para tu kit de CCTV</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px]">
            <div>
              <label className="block text-slate-400 font-medium mb-1">Cámaras</label>
              <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-1">
                <button
                  type="button"
                  onClick={() => setCalcCameras(Math.max(1, calcCameras - 1))}
                  className="px-2 text-slate-400 hover:text-white font-bold h-6 flex items-center min-w-[28px] justify-center"
                >
                  -
                </button>
                <span className="flex-1 text-center font-bold text-white text-xs">{calcCameras}</span>
                <button
                  type="button"
                  onClick={() => setCalcCameras(calcCameras + 1)}
                  className="px-2 text-slate-400 hover:text-white font-bold h-6 flex items-center min-w-[28px] justify-center"
                >
                  +
                </button>
              </div>
            </div>

            <div>
              <label className="block text-slate-400 font-medium mb-1">Resolución</label>
              <select
                value={calcResolution}
                onChange={e => setCalcResolution(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-1.5 text-white focus:outline-none focus:border-red-550"
              >
                <option value="2mp">1080P (2 Megapíxeles)</option>
                <option value="4mp">4 Megapíxeles (2K)</option>
                <option value="8mp">8 Megapíxeles (4K UHD)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 font-medium mb-1">Días Grabación</label>
              <select
                value={calcDays}
                onChange={e => setCalcDays(parseInt(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-1.5 text-white focus:outline-none focus:border-red-555"
              >
                <option value="7">7 días de resguardo</option>
                <option value="15">15 días de resguardo</option>
                <option value="30">30 días de resguardo</option>
                <option value="45">45 días de resguardo</option>
                <option value="60">60 días de resguardo</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 font-medium mb-1">Compresión</label>
              <select
                value={calcCompression}
                onChange={e => setCalcCompression(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-1.5 text-white focus:outline-none focus:border-red-556"
              >
                <option value="h265">H.265+ (Inteligente)</option>
                <option value="h264">H.264 (Estándar)</option>
              </select>
            </div>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="space-y-0.5">
              <span className="text-[9.5px] text-slate-400 uppercase tracking-widest block font-mono">Espacio Requerido Calculado</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-base font-bold text-red-500 font-mono">{calculatedTB} TB</span>
                <span className="text-[10px] text-slate-400 font-mono">({calculatedGB} GB)</span>
              </div>
            </div>

            {recommendedHDD ? (
              <div className="flex-1 bg-red-950/20 border border-red-900/30 p-2 rounded-lg flex items-center justify-between gap-3 text-xs w-full sm:w-auto">
                <div>
                  <span className="text-[9.5px] text-red-400 font-bold uppercase tracking-wider block font-mono">Disco Sugerido</span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-white block truncate text-[11px] max-w-[120px]">{recommendedHDD.name}</span>
                    <a 
                      href={recommendedHDD.providerUrl || `https://tvc.mx/buscador?q=${recommendedHDD.sku}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[9px] text-red-400 hover:text-red-300 font-semibold"
                    >
                      ↗ Ficha
                    </a>
                  </div>
                  <span className="text-red-300 block text-[10px] font-mono">Auto-incluido en cotización técnica</span>
                </div>
                <button
                  type="button"
                  onClick={() => addToCart(recommendedHDD)}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-2.5 py-1.5 rounded-lg text-[10px] transition-all cursor-pointer shadow-sm shrink-0 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Agregar
                </button>
              </div>
            ) : (
              <span className="text-[11px] text-slate-400 italic">No se encontró disco HDD exacto</span>
            )}
          </div>
        </div>

        {/* Product Grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredProducts.map((p) => (
            <div key={p.id} className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 flex flex-col justify-between hover:border-slate-350 hover:shadow-xs transition-all">
              <div>
                <div className="flex justify-between items-start gap-2 mb-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] font-mono bg-slate-200 text-slate-800 px-2 py-0.5 rounded">
                      {p.sku}
                    </span>
                    <a 
                      href={p.providerUrl || `https://tvc.mx/buscador?q=${p.sku}`} 
                      target="_blank" 
                      rel="noreferrer"
                      title="Abrir ficha técnica directa en tvc.mx"
                      className="text-[9.5px] text-red-600 hover:text-red-700 font-semibold hover:underline flex items-center gap-0.5 bg-red-50 hover:bg-red-100 px-1.5 py-0.5 rounded transition-all cursor-pointer"
                    >
                      <span>🌐 TVC</span> <span className="text-[8px]">↗</span>
                    </a>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${p.stock > 10 ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                    {p.stock} un. stock
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 line-clamp-2 h-8">{p.name}</h4>
                <p className="text-[10.5px] text-slate-400 mt-1 line-clamp-2">{p.description}</p>
              </div>

              <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-100">
                <div>
                  <span className="text-[10px] text-slate-500 block">Tipo de Equipo</span>
                  <span className="text-xs font-bold text-slate-700 uppercase font-mono">{p.type === 'dahua_kit' ? 'Kit CCTV Completo' : p.type === 'analog' ? 'Cámara Analógica' : p.type === 'ip' ? 'Cámara IP Digital' : 'Almacenamiento / HDD'}</span>
                </div>
                <button 
                  onClick={() => addToCart(p)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg transition-colors cursor-pointer text-xs font-bold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Agregar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* active Quote Creator Drawer / Cart - 5 Cols */}
      <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between h-[max-content]">
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold font-display text-slate-950 flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-red-600" /> Presupuesto Activo
            </h3>
            <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
              {cart.length} productos
            </span>
          </div>

          {/* Cart item products */}
          <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
            {cart.length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-xs">
                Selecciona equipos de cámaras en el catálogo para armar la cotización.
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.product.id} className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs text-slate-800">
                  <div className="flex-1 min-w-0 pr-2">
                    <h5 className="font-bold text-slate-900 truncate">{item.product.name}</h5>
                    <span className="text-[10px] text-slate-500">{item.product.sku} | Tipo: {item.product.type.toUpperCase()}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => updateQuantity(item.product.id, -1)}
                      className="text-slate-500 hover:text-red-600 p-1 shrink-0 min-w-[28px] h-7 flex items-center justify-center border border-slate-205 rounded"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-bold text-slate-900 text-xs">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.product.id, 1)}
                      className="text-slate-500 hover:text-red-600 p-1 shrink-0 min-w-[28px] h-7 flex items-center justify-center border border-slate-205 rounded"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                    <button 
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-red-500 p-1 ml-1 shrink-0 min-w-[28px] h-7 flex items-center justify-center hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Quoting inputs forms */}
          <div className="space-y-3 border-t border-slate-100 pt-3">
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Información del Cliente y Obra</h4>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="block text-[10px] text-slate-500 mb-0.5">Nombre Cliente</label>
                <input 
                  type="text" 
                  placeholder="Familia Diaz"
                  value={clientName}
                  onChange={e => setClientName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 focus:outline-none focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-500 mb-0.5">Celular del Cliente (WhatsApp)</label>
                <input 
                  type="text" 
                  placeholder="+52 99312233"
                  value={clientPhone}
                  onChange={e => setClientPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 focus:outline-none focus:border-red-500"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-[10px] text-slate-500 mb-0.5">Identificador de Proyecto (ej. Obra Lote 12)</label>
                <input 
                  type="text" 
                  placeholder="Instalacion Residencia"
                  value={projectName}
                  onChange={e => setProjectName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 focus:outline-none focus:border-red-500"
                />
              </div>

              {/* GOOGLE MAPS PROJECT ADDRESS AND MEASUREMENT PLATFORM */}
              <div className="col-span-2 space-y-2 border-t border-slate-100 pt-3">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-red-650 text-red-600" /> Dirección y Medidas de Predio
                  </label>
                  {((hasValidKey ? measuredArea : simArea) > 0) && (
                    <span className="text-[10px] font-bold bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-mono">
                      {(hasValidKey ? measuredArea : simArea).toFixed(1)} m²
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-[10px] text-slate-500 mb-0.5">Dirección del Proyecto</label>
                  <div className="flex gap-1.5">
                    <input 
                      type="text" 
                      placeholder="Calle, Número, Colonia, Municipio"
                      value={projectAddress}
                      onChange={e => setProjectAddress(e.target.value)}
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-lg p-2 focus:outline-none focus:border-red-500 text-xs"
                    />
                    <button
                      type="button"
                      onClick={handleSearchAddressOnMap}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold px-3 py-2 rounded-lg transition-all cursor-pointer text-[11px] min-h-[38px] flex items-center justify-center shrink-0"
                      title="Ubicar dirección en mapa satelital"
                    >
                      Ubicar
                    </button>
                  </div>
                </div>

                {/* Satellite interactive measurement module */}
                <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                  <div className="p-2 bg-slate-100 border-b border-slate-200 text-[10px] text-slate-600 flex justify-between items-center flex-wrap gap-1">
                    <span className="font-semibold flex items-center gap-1">
                      🛰️ Vista Satelital de Precisión
                    </span>
                    <button
                      type="button"
                      onClick={clearMapMarkers}
                      className="text-red-600 hover:text-red-700 font-bold hover:underline"
                    >
                      Reiniciar Puntos
                    </button>
                  </div>

                  <div className="relative w-full h-[180px] bg-slate-900 flex flex-col justify-between">
                    {hasValidKey ? (
                      <APIProvider apiKey={API_KEY} version="weekly">
                        <Map
                          id="property_satellite_map"
                          center={mapCenter}
                          onCenterChanged={(e) => setMapCenter(e.detail.center)}
                          zoom={mapZoom}
                          onZoomChanged={(e) => setMapZoom(e.detail.zoom)}
                          onClick={handleMapClick}
                          mapTypeId="satellite"
                          disableDefaultUI={true}
                          zoomControl={true}
                          style={{ width: '100%', height: '100%' }}
                        >
                          {polygonPath.map((pt, idx) => (
                            <AdvancedMarker
                              key={idx}
                              position={pt}
                            >
                              <div className="w-5 h-5 bg-red-600 border border-white rounded-full flex items-center justify-center font-bold text-[9px] text-white shadow-md">
                                {idx + 1}
                              </div>
                            </AdvancedMarker>
                          ))}
                        </Map>
                      </APIProvider>
                    ) : (
                      /* OFFLINE MANUALLY CONTROLLED LAND ESTIMATOR */
                      <div className="absolute inset-0 p-3 flex flex-col justify-between overflow-y-auto bg-slate-900 text-slate-200 text-[11px]">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-red-500 font-bold uppercase tracking-wider text-[10px]">
                            <ShieldCheck className="w-3.5 h-3.5 text-red-500" /> Licencia Google Maps
                          </div>
                          <p className="text-slate-400 text-[9.5px] leading-relaxed">
                            Para medir en tiempo real sobre foto satelital, ingresa tu API Key en AI Studio Secrets con el nombre: <code className="text-red-400 font-mono">GOOGLE_MAPS_PLATFORM_KEY</code> y se activará automáticamente.
                          </p>
                        </div>

                        {/* Interactive Offline inputs for land dimensions */}
                        <div className="border-t border-slate-800 pt-2 space-y-2">
                          <span className="text-[9.5px] text-red-400 font-bold uppercase tracking-wider block">Dimensiones Manuales del Terreno:</span>
                          <div className="grid grid-cols-2 gap-2 text-[9.5px]">
                            <div>
                              <span className="block text-slate-400 mb-0.5 font-medium">Ancho del Terreno (m)</span>
                              <input 
                                type="number" 
                                value={simWidth}
                                onChange={(e) => {
                                  const w = parseFloat(e.target.value) || 0;
                                  setSimWidth(w);
                                  setSimArea(w * simLength);
                                }}
                                className="w-full bg-slate-950 border border-slate-800 rounded p-1 text-white font-mono text-xs focus:ring-1 focus:ring-red-500 focus:outline-none"
                              />
                            </div>
                            <div>
                              <span className="block text-slate-400 mb-0.5 font-medium">Largo del Terreno (m)</span>
                              <input 
                                type="number" 
                                value={simLength}
                                onChange={(e) => {
                                  const l = parseFloat(e.target.value) || 0;
                                  setSimLength(l);
                                  setSimArea(simWidth * l);
                                }}
                                className="w-full bg-slate-950 border border-slate-800 rounded p-1 text-white font-mono text-xs focus:ring-1 focus:ring-red-500 focus:outline-none"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Dynamic Perimeter/Area Measurements Info Panel */}
                  <div className="p-2.5 bg-slate-950 text-white flex justify-between items-center text-[10px] font-mono leading-tight border-t border-slate-850">
                    <div>
                      <span className="text-slate-400 block text-[8px] uppercase tracking-wider">Superficie</span>
                      <span className="font-bold text-red-500 text-[11px]">{(hasValidKey ? measuredArea : simArea).toFixed(1)} m²</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[8px] uppercase tracking-wider">Perímetro</span>
                      <span className="font-bold text-slate-200 text-[11px]">{(hasValidKey ? measuredPerimeter : (simWidth * 2 + simLength * 2)).toFixed(1)} m</span>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-400 block text-[8px] uppercase tracking-wider">Uso de Cable (Est.)</span>
                      <span className="font-bold text-emerald-400 text-[11px]">{( (hasValidKey ? measuredPerimeter : (simWidth * 2 + simLength * 2)) * 1.5 ).toFixed(0)} m</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECCIÓN NUEVA: PARÁMETROS ADICIONALES DE COTIZACIÓN */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3 pt-3.5 text-xs text-slate-800">
            <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-200 pb-1.5">
              ⚙️ Parámetros Adicionales de Cotización
            </h4>
            <label className="flex items-start gap-2.5 font-bold cursor-pointer bg-slate-100 p-3 rounded-lg border border-slate-200 text-slate-900">
                <input
                  type="checkbox"
                  checked={isOutsideMetro}
                  onChange={(e) => {
                    setIsOutsideMetro(e.target.checked);
                  }}
                  className="rounded border-slate-300 text-red-600 focus:ring-red-500 w-4 h-4 mt-0.5 cursor-pointer"
                />
                <div className="space-y-0.5">
                  <span className="block text-xs font-bold">Ubicación Fuera del Área Metropolitana</span>
                  <span className="block text-[10px] text-slate-500 font-normal leading-tight">Marcar si el predio requiere transporte foráneo y viáticos especiales.</span>
                </div>
              </label>

              {isOutsideMetro && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-[10.5px] text-amber-900 space-y-1 animate-fade-in leading-relaxed">
                  <span className="font-bold flex items-center gap-1">⚠️ AVISO PARA CONFIGURACIÓN FORÁNEA</span>
                  <p>
                    Se ha incluido una cláusula específica en el requerimiento de que el cliente autorizará los gastos extraordinarios de hospedaje y alimentos de los ingenieros por separado.
                  </p>
                </div>
              )}

              {/* Autogenerated specs info block */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block border-b border-slate-200 pb-1">
                  Suministros Auto-Asignados del Proyecto
                </span>
                
                <div className="space-y-2 text-xs font-sans">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-semibold block text-slate-950">1. Cajas de Protección</span>
                      <span className="text-[10px] text-slate-500">Modelo SAXXON SXWD008 impermeable</span>
                    </div>
                    <span className="bg-slate-200 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded shrink-0 font-mono">
                      {totalCamerasCount} pzas
                    </span>
                  </div>

                  <div className="flex justify-between items-start border-t border-slate-100 pt-1.5">
                    <div>
                      <span className="font-semibold block text-slate-950">2. Metraje de Canalización</span>
                      <span className="text-[10px] text-slate-500">30 metros de cableado profesional por cámara</span>
                    </div>
                    <span className="bg-slate-200 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded shrink-0 font-mono">
                      {totalCamerasCount * 30} m
                    </span>
                  </div>

                  {totalAnalogCameras > 0 ? (
                    <div className="border-t border-slate-200 pt-2 space-y-1.5">
                      <span className="text-[9px] font-bold tracking-wider uppercase block text-red-650">Accesorios de Cámaras Analógicas</span>
                      
                      <div className="flex justify-between items-center text-[10.5px]">
                        <span className="text-slate-600">Transceptores DAHUA PFM800B-4K</span>
                        <span className="font-bold text-slate-900 font-mono">{totalAnalogCameras} pares</span>
                      </div>

                      <div className="flex justify-between items-center text-[10.5px]">
                        <span className="text-slate-600">Conectores de Corriente Macho</span>
                        <span className="font-bold text-slate-900 font-mono">{totalAnalogCameras} pzas</span>
                      </div>

                      <div className="flex justify-between items-center text-[10.5px]">
                        <span className="text-slate-600">Conectores de Corriente Hembra</span>
                        <span className="font-bold text-slate-900 font-mono">{totalAnalogCameras} pzas</span>
                      </div>

                      <div className="flex justify-between items-center text-[10.5px]">
                        <span className="text-slate-600">Fuente Regulada Multicanal ({powerSupplyChannels}CH)</span>
                        <span className="font-bold text-emerald-600 font-mono">1 pza</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-[9.5px] text-slate-400 italic pt-1 border-t border-slate-100">
                      No se detectaron cámaras analógicas en el presupuesto. No se requieren baluns ni conectores de corriente extras.
                    </div>
                  )}
                </div>
              </div>

              {/* Brief specs stats (Replaces Priced Totals) */}
              <div className="bg-slate-950 p-4 rounded-xl text-white space-y-2">
                <span className="text-[9px] text-slate-400 font-mono uppercase tracking-widest block text-center">Resumen Técnico de Obra</span>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div>
                    <span className="text-slate-400 block text-[9px]">Cámaras Totales:</span>
                    <span className="font-bold text-red-500 text-xs">{totalCamerasCount} unidades</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[9px]">Analógicas / IP:</span>
                    <span className="font-bold text-slate-200 text-xs">{totalAnalogCameras} / {totalCamerasCount - totalAnalogCameras}</span>
                  </div>
                  <div className="col-span-2 border-t border-slate-800 pt-1.5 mt-0.5">
                    <span className="text-slate-400 block text-[9px]">Canalización Sujeta a Instalación:</span>
                    <span className="font-bold text-emerald-400 text-xs">{totalCamerasCount * 30} metros lineales</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action buttons generators */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={generatePDF}
                className="w-full bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs p-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer min-h-[44px]"
              >
                <FileText className="w-4 h-4 text-red-500" /> Descargar Ficha Técnica de Proyecto (PDF)
              </button>

              <button
                type="button"
                onClick={handleSendWhatsAppMessage}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs p-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer min-h-[44px]"
              >
                <Send className="w-4 h-4 text-white" /> Enviar Ficha de Requerimiento (WhatsApp)
              </button>
            </div>

            {/* SECTION: Direct Ordering from Supplier API (Pedidos Directos) */}
            <div className="bg-slate-50 p-2.5 border border-slate-200 rounded-xl space-y-3">
              <div className="flex items-center gap-2">
                <Zap className="text-amber-500 w-4 h-4" />
                <h4 className="text-xs font-bold text-slate-950">Alinear y Enviar Solicitud a CCTV del Sur</h4>
              </div>

              <p className="text-[10px] text-slate-500 leading-normal font-sans">
                Al enviar tu solicitud, el predio medido y los componentes requeridos se guardarán en el servidor. Tus ingenieros calcularán y te llamarán en un lapso de 3 días hábiles.
              </p>

              <div className="space-y-2 text-xs">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleRegisterProject}
                    className="w-full bg-slate-900 hover:bg-slate-850 text-white p-2.5 rounded-xl text-xs font-bold tracking-tight min-h-[44px] flex items-center justify-center cursor-pointer transition-all font-sans"
                  >
                    Registrar Proyecto y Solicitar Presupuesto
                  </button>
                </div>

                {requestSuccess && (
                  <div className="bg-emerald-50 text-emerald-800 border-2 border-emerald-500 p-3 rounded-xl mt-2 animate-fade-in space-y-1.5 font-sans">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span className="font-bold text-xs">¡Solicitud Enviada con Éxito!</span>
                    </div>
                    <p className="text-[10px] text-emerald-700 leading-relaxed font-sans font-medium">
                      Tu proyecto se ha registrado de forma segura. Un asesor comercial especializado se pondrá en contacto contigo en un plazo máximo de <strong>3 días hábiles</strong> para concertar la cotización final y coordinar viáticos si corresponde.
                    </p>
                    <button
                      type="button"
                      onClick={() => setRequestSuccess(false)}
                      className="text-[9.5px] font-bold text-emerald-950 border border-emerald-300 px-2 py-1 rounded bg-emerald-100 hover:bg-emerald-200 cursor-pointer transition-all"
                    >
                      Entendido
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
