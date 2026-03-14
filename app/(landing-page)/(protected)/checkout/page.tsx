"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCheckoutStore, useInitiatePayment } from "@/hooks/useCheckout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/landing-page/cooperatives/Footer";

const COUNTRY_STATES: Record<string, string[]> = {
  Afghanistan: ["Kabul", "Kandahar", "Herat", "Mazar-i-Sharif", "Jalalabad"],
  Albania: ["Tirana", "Durrës", "Vlorë", "Shkodër", "Fier"],
  Algeria: ["Algiers", "Oran", "Constantine", "Annaba", "Blida"],
  Angola: ["Luanda", "Huambo", "Lobito", "Benguela", "Kuito"],
  Argentina: ["Buenos Aires", "Córdoba", "Rosario", "Mendoza", "Tucumán", "Santa Fe", "Salta"],
  Australia: ["New South Wales", "Victoria", "Queensland", "Western Australia", "South Australia", "Tasmania", "ACT", "Northern Territory"],
  Austria: ["Vienna", "Graz", "Linz", "Salzburg", "Innsbruck"],
  Bangladesh: ["Dhaka", "Chittagong", "Khulna", "Rajshahi", "Sylhet", "Barishal"],
  Belgium: ["Brussels", "Antwerp", "Ghent", "Liège", "Bruges"],
  Benin: ["Cotonou", "Porto-Novo", "Parakou", "Abomey-Calavi", "Bohicon"],
  Bolivia: ["La Paz", "Santa Cruz", "Cochabamba", "Sucre", "Oruro"],
  Brazil: ["São Paulo", "Rio de Janeiro", "Minas Gerais", "Bahia", "Paraná", "Rio Grande do Sul", "Pernambuco", "Ceará", "Amazonas"],
  "Burkina Faso": ["Ouagadougou", "Bobo-Dioulasso", "Koudougou", "Banfora", "Ouahigouya"],
  Cameroon: ["Yaoundé", "Douala", "Bamenda", "Bafoussam", "Garoua", "Maroua"],
  Canada: ["Ontario", "Quebec", "British Columbia", "Alberta", "Manitoba", "Saskatchewan", "Nova Scotia", "New Brunswick"],
  Chad: ["N'Djamena", "Moundou", "Sarh", "Abéché", "Kelo"],
  Chile: ["Santiago", "Valparaíso", "Concepción", "La Serena", "Antofagasta"],
  China: ["Beijing", "Shanghai", "Guangdong", "Zhejiang", "Jiangsu", "Sichuan", "Henan", "Hubei", "Hunan"],
  Colombia: ["Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena", "Bucaramanga"],
  Congo: ["Brazzaville", "Pointe-Noire", "Dolisie", "Nkayi", "Impfondo"],
  "Cote d'Ivoire": ["Abidjan", "Bouaké", "Daloa", "Yamoussoukro", "San-Pédro", "Korhogo"],
  "Czech Republic": ["Prague", "Brno", "Ostrava", "Plzeň", "Liberec"],
  Denmark: ["Copenhagen", "Aarhus", "Odense", "Aalborg", "Esbjerg"],
  "DR Congo": ["Kinshasa", "Lubumbashi", "Mbuji-Mayi", "Kananga", "Kisangani", "Bukavu"],
  Ecuador: ["Quito", "Guayaquil", "Cuenca", "Ambato", "Manta"],
  Egypt: ["Cairo", "Alexandria", "Giza", "Shubra El-Kheima", "Port Said", "Luxor", "Aswan"],
  Ethiopia: ["Addis Ababa", "Dire Dawa", "Mekelle", "Gondar", "Hawassa", "Bahir Dar"],
  Finland: ["Helsinki", "Espoo", "Tampere", "Vantaa", "Oulu"],
  France: ["Île-de-France", "Provence-Alpes-Côte d'Azur", "Auvergne-Rhône-Alpes", "Nouvelle-Aquitaine", "Occitanie", "Hauts-de-France", "Normandy", "Brittany"],
  Gambia: ["Banjul", "Serekunda", "Brikama", "Bakau", "Farafenni"],
  Germany: ["Bavaria", "North Rhine-Westphalia", "Baden-Württemberg", "Berlin", "Hamburg", "Hesse", "Saxony", "Brandenburg"],
  Ghana: ["Greater Accra", "Ashanti", "Western", "Eastern", "Central", "Northern", "Volta", "Brong-Ahafo"],
  Greece: ["Attica", "Central Macedonia", "Thessaly", "Western Greece", "Crete", "Peloponnese"],
  Guinea: ["Conakry", "Kankan", "Kindia", "Labé", "N'Zérékoré"],
  Hungary: ["Budapest", "Debrecen", "Miskolc", "Pécs", "Győr"],
  India: ["Maharashtra", "Uttar Pradesh", "Tamil Nadu", "Karnataka", "Gujarat", "West Bengal", "Rajasthan", "Andhra Pradesh", "Kerala", "Delhi"],
  Indonesia: ["Jakarta", "West Java", "East Java", "Central Java", "Banten", "Sumatra Utara", "Sulawesi Selatan"],
  Iran: ["Tehran", "Isfahan", "Fars", "Khorasan Razavi", "East Azerbaijan", "Mazandaran"],
  Iraq: ["Baghdad", "Basra", "Nineveh", "Erbil", "Sulaymaniyah", "Kirkuk"],
  Ireland: ["Dublin", "Cork", "Limerick", "Galway", "Waterford"],
  Israel: ["Tel Aviv", "Jerusalem", "Haifa", "Rishon LeZion", "Petah Tikva", "Ashdod"],
  Italy: ["Lombardy", "Lazio", "Campania", "Sicily", "Veneto", "Piedmont", "Emilia-Romagna", "Tuscany"],
  Japan: ["Tokyo", "Osaka", "Kanagawa", "Aichi", "Hokkaido", "Fukuoka", "Hyogo", "Saitama"],
  Jordan: ["Amman", "Zarqa", "Irbid", "Aqaba", "Madaba", "Karak"],
  Kazakhstan: ["Almaty", "Nur-Sultan", "Shymkent", "Karaganda", "Aktobe"],
  Kenya: ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Thika", "Nyeri"],
  Kuwait: ["Kuwait City", "Hawalli", "Ahmadi", "Farwaniyah", "Jahra"],
  Lebanon: ["Beirut", "Tripoli", "Sidon", "Tyre", "Jounieh"],
  Libya: ["Tripoli", "Benghazi", "Misrata", "Tarhuna", "Zawiya"],
  Madagascar: ["Antananarivo", "Toamasina", "Antsirabe", "Fianarantsoa", "Mahajanga"],
  Malawi: ["Lilongwe", "Blantyre", "Mzuzu", "Zomba", "Kasungu"],
  Malaysia: ["Kuala Lumpur", "Selangor", "Johor", "Penang", "Perak", "Sabah", "Sarawak", "Kedah"],
  Mali: ["Bamako", "Sikasso", "Mopti", "Koulikoro", "Kayes"],
  Mauritania: ["Nouakchott", "Nouadhibou", "Rosso", "Kiffa", "Kaédi"],
  Mexico: ["Mexico City", "Jalisco", "Nuevo León", "Estado de México", "Veracruz", "Puebla", "Guanajuato", "Chihuahua"],
  Morocco: ["Casablanca", "Rabat", "Fez", "Marrakesh", "Agadir", "Tangier", "Meknes", "Oujda"],
  Mozambique: ["Maputo", "Matola", "Beira", "Nampula", "Chimoio"],
  Myanmar: ["Yangon", "Mandalay", "Naypyidaw", "Mawlamyine", "Bago"],
  Nepal: ["Bagmati", "Madhesh", "Gandaki", "Lumbini", "Karnali", "Sudurpashchim"],
  Netherlands: ["North Holland", "South Holland", "Utrecht", "North Brabant", "Gelderland"],
  "New Zealand": ["Auckland", "Wellington", "Canterbury", "Waikato", "Bay of Plenty", "Otago"],
  Niger: ["Niamey", "Zinder", "Maradi", "Agadez", "Tahoua"],
  Nigeria: [
    "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
    "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu",
    "FCT - Abuja", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina",
    "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo",
    "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
  ],
  Norway: ["Oslo", "Bergen", "Trondheim", "Stavanger", "Kristiansand"],
  Pakistan: ["Punjab", "Sindh", "Khyber Pakhtunkhwa", "Balochistan", "Islamabad", "Gilgit-Baltistan"],
  Peru: ["Lima", "Arequipa", "Trujillo", "Chiclayo", "Piura", "Cusco"],
  Philippines: ["Metro Manila", "Cebu", "Davao", "Calabarzon", "Central Luzon", "Western Visayas"],
  Poland: ["Masovian", "Lesser Poland", "Silesian", "Greater Poland", "Lower Silesian", "Łódź"],
  Portugal: ["Lisbon", "Porto", "Braga", "Setúbal", "Aveiro", "Coimbra"],
  Qatar: ["Doha", "Al Rayyan", "Al Wakrah", "Al Khor", "Umm Salal"],
  Romania: ["Bucharest", "Cluj", "Iași", "Timișoara", "Constanța"],
  Russia: ["Moscow", "Saint Petersburg", "Novosibirsk", "Yekaterinburg", "Kazan", "Chelyabinsk"],
  Rwanda: ["Kigali", "Southern Province", "Northern Province", "Eastern Province", "Western Province"],
  "Saudi Arabia": ["Riyadh", "Mecca", "Medina", "Jeddah", "Dammam", "Tabuk", "Khobar"],
  Senegal: ["Dakar", "Thiès", "Diourbel", "Saint-Louis", "Tambacounda", "Kaolack"],
  "Sierra Leone": ["Freetown", "Bo", "Kenema", "Makeni", "Koidu"],
  Singapore: ["Central Region", "East Region", "North Region", "North-East Region", "West Region"],
  Somalia: ["Mogadishu", "Hargeisa", "Bosaso", "Kismayo", "Beledweyne"],
  "South Africa": ["Gauteng", "Western Cape", "KwaZulu-Natal", "Eastern Cape", "Limpopo", "Mpumalanga", "Free State", "North West", "Northern Cape"],
  "South Korea": ["Seoul", "Busan", "Incheon", "Daegu", "Daejeon", "Gwangju", "Gyeonggi"],
  "South Sudan": ["Juba", "Wau", "Malakal", "Yei", "Bor"],
  Spain: ["Madrid", "Catalonia", "Andalusia", "Valencia", "Galicia", "Basque Country", "Castile and León"],
  "Sri Lanka": ["Western", "Central", "Southern", "Northern", "Eastern", "North Western", "Sabaragamuwa"],
  Sudan: ["Khartoum", "Omdurman", "Port Sudan", "Kassala", "El Obeid"],
  Sweden: ["Stockholm", "Västra Götaland", "Skåne", "Östergötland", "Uppsala"],
  Switzerland: ["Zurich", "Bern", "Vaud", "Geneva", "Basel-Stadt", "Lucerne"],
  Syria: ["Damascus", "Aleppo", "Homs", "Latakia", "Hama", "Deir ez-Zor"],
  Tanzania: ["Dar es Salaam", "Mwanza", "Arusha", "Mbeya", "Morogoro", "Tanga", "Zanzibar"],
  Thailand: ["Bangkok", "Chiang Mai", "Phuket", "Chonburi", "Nonthaburi", "Nakhon Ratchasima"],
  Togo: ["Lomé", "Sokodé", "Kara", "Kpalimé", "Atakpamé"],
  Tunisia: ["Tunis", "Sfax", "Sousse", "Kairouan", "Bizerte", "Gabès"],
  Turkey: ["Istanbul", "Ankara", "Izmir", "Bursa", "Adana", "Antalya", "Konya", "Gaziantep"],
  Uganda: ["Kampala", "Gulu", "Lira", "Mbarara", "Jinja", "Mbale", "Masaka"],
  Ukraine: ["Kyiv", "Kharkiv", "Dnipro", "Odessa", "Lviv", "Zaporizhzhia", "Donetsk"],
  "United Arab Emirates": ["Abu Dhabi", "Dubai", "Sharjah", "Ajman", "Ras Al Khaimah", "Fujairah", "Umm Al Quwain"],
  "United Kingdom": ["England", "Scotland", "Wales", "Northern Ireland"],
  "United States": ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"],
  Venezuela: ["Caracas", "Maracaibo", "Valencia", "Barquisimeto", "Maracay"],
  Vietnam: ["Hanoi", "Ho Chi Minh City", "Da Nang", "Haiphong", "Can Tho", "Bien Hoa"],
  Yemen: ["Sana'a", "Aden", "Taiz", "Hodeidah", "Ibb", "Mukalla"],
  Zambia: ["Lusaka", "Kitwe", "Ndola", "Kabwe", "Chingola", "Livingstone"],
  Zimbabwe: ["Harare", "Bulawayo", "Chitungwiza", "Mutare", "Gweru", "Kwekwe"],
};

const LOGISTICS_OPTIONS = [
  { id: "fedex-express", name: "FedEx Express", time: "2weeks", price: 200 },
  {
    id: "dhl-express",
    name: "DHL Express",
    time: "2-3 business days",
    price: 150,
  },
  { id: "fedex-standard", name: "FedEx Standard", time: "2weeks", price: 100 },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { orderData } = useCheckoutStore();
  const { mutate: initiatePayment, isPending: isProcessingPayment } =
    useInitiatePayment();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    city: "",
    streetAddress: "",
    zipCode: "",
    deliveryAddressType: "same", // 'same' or 'different'
    differentAddress: "",
  });

  // const [selectedLogistics, setSelectedLogistics] = useState(LOGISTICS_OPTIONS[1].id);
  const [promoCode, setPromoCode] = useState("");

  useEffect(() => {
    if (!orderData) {
      toast.error("No order found. Redirecting to cart.");
      router.push("/cart");
    }
  }, [orderData, router]);

  if (!orderData) return null;

  // const selectedLogisticsOption = LOGISTICS_OPTIONS.find((l) => l.id === selectedLogistics)!;
  // const shippingCost = 1500;
  // const deliveryCost = selectedLogisticsOption.price;

  const subtotal = orderData.order.total_amount;
  // const tax = subtotal * 0.075;

  const total = subtotal;

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePayment = () => {
    // Basic validation
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.streetAddress
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    const payload = {
      description: `Checkout payment for order #${orderData.order._id}`,
      name: formData.fullName,
      orderId: orderData.order._id,
      email: formData.email,
      phone: formData.phone,
      country: formData.country,
      state: formData.state,
      city: formData.city,
      address: [formData.streetAddress],
      DeliveryAddress:
        formData.deliveryAddressType === "same"
          ? "Same as shipping address"
          : formData.differentAddress,
      zipCode: formData.zipCode,
    };

    initiatePayment(payload, {
      onSuccess: (data) => {
        toast.success("Payment initiated successfully");
        if (data.redirectUrl) {
          window.location.href = data.redirectUrl;
        } else {
          toast.error("No redirect URL returned");
        }
      },
      onError: (error: any) => {
        console.error("Payment failed:", error);
        toast.error(error.message || "Failed to initiate payment");
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFD]">
      <Header />
      <main className="flex-1 py-32 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className=" text-4xl font-bold text-foreground mb-2">
              Checkout
            </h1>
            <p className="text-muted-foreground text-sm">
              Home / Shopping Cart / Checkout
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column - Forms */}
            <div className="lg:col-span-7 space-y-10">
              {/* Billing Details */}
              <section>
                <div className="bg-white border border-gray-100 rounded-lg p-4 mb-6 text-center font-medium">
                  Billing Details
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      placeholder="John Doe"
                      className="bg-gray-50/50 border-gray-200 h-12 w-full"
                      value={formData.fullName}
                      onChange={(e) =>
                        handleInputChange("fullName", e.target.value)
                      }
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="hello@example.com"
                        className="bg-gray-50/50 border-gray-200 h-12 w-full"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        placeholder="Enter Number"
                        className="bg-gray-50/50 border-gray-200 h-12 w-full"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Country</Label>
                    <Select
                      onValueChange={(val) => {
                        handleInputChange("country", val);
                        handleInputChange("state", "");
                      }}
                    >
                      <SelectTrigger className="bg-gray-50/50 border-gray-200 h-12 w-full">
                        <SelectValue placeholder="Select Country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Afghanistan">Afghanistan</SelectItem>
                        <SelectItem value="Albania">Albania</SelectItem>
                        <SelectItem value="Algeria">Algeria</SelectItem>
                        <SelectItem value="Angola">Angola</SelectItem>
                        <SelectItem value="Argentina">Argentina</SelectItem>
                        <SelectItem value="Australia">Australia</SelectItem>
                        <SelectItem value="Austria">Austria</SelectItem>
                        <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                        <SelectItem value="Belgium">Belgium</SelectItem>
                        <SelectItem value="Benin">Benin</SelectItem>
                        <SelectItem value="Bolivia">Bolivia</SelectItem>
                        <SelectItem value="Brazil">Brazil</SelectItem>
                        <SelectItem value="Burkina Faso">Burkina Faso</SelectItem>
                        <SelectItem value="Cameroon">Cameroon</SelectItem>
                        <SelectItem value="Canada">Canada</SelectItem>
                        <SelectItem value="Chad">Chad</SelectItem>
                        <SelectItem value="Chile">Chile</SelectItem>
                        <SelectItem value="China">China</SelectItem>
                        <SelectItem value="Colombia">Colombia</SelectItem>
                        <SelectItem value="Congo">Congo</SelectItem>
                        <SelectItem value="Cote d'Ivoire">Cote d&apos;Ivoire</SelectItem>
                        <SelectItem value="Czech Republic">Czech Republic</SelectItem>
                        <SelectItem value="Denmark">Denmark</SelectItem>
                        <SelectItem value="DR Congo">DR Congo</SelectItem>
                        <SelectItem value="Ecuador">Ecuador</SelectItem>
                        <SelectItem value="Egypt">Egypt</SelectItem>
                        <SelectItem value="Ethiopia">Ethiopia</SelectItem>
                        <SelectItem value="Finland">Finland</SelectItem>
                        <SelectItem value="France">France</SelectItem>
                        <SelectItem value="Gambia">Gambia</SelectItem>
                        <SelectItem value="Germany">Germany</SelectItem>
                        <SelectItem value="Ghana">Ghana</SelectItem>
                        <SelectItem value="Greece">Greece</SelectItem>
                        <SelectItem value="Guinea">Guinea</SelectItem>
                        <SelectItem value="Hungary">Hungary</SelectItem>
                        <SelectItem value="India">India</SelectItem>
                        <SelectItem value="Indonesia">Indonesia</SelectItem>
                        <SelectItem value="Iran">Iran</SelectItem>
                        <SelectItem value="Iraq">Iraq</SelectItem>
                        <SelectItem value="Ireland">Ireland</SelectItem>
                        <SelectItem value="Israel">Israel</SelectItem>
                        <SelectItem value="Italy">Italy</SelectItem>
                        <SelectItem value="Japan">Japan</SelectItem>
                        <SelectItem value="Jordan">Jordan</SelectItem>
                        <SelectItem value="Kazakhstan">Kazakhstan</SelectItem>
                        <SelectItem value="Kenya">Kenya</SelectItem>
                        <SelectItem value="Kuwait">Kuwait</SelectItem>
                        <SelectItem value="Lebanon">Lebanon</SelectItem>
                        <SelectItem value="Libya">Libya</SelectItem>
                        <SelectItem value="Madagascar">Madagascar</SelectItem>
                        <SelectItem value="Malawi">Malawi</SelectItem>
                        <SelectItem value="Malaysia">Malaysia</SelectItem>
                        <SelectItem value="Mali">Mali</SelectItem>
                        <SelectItem value="Mauritania">Mauritania</SelectItem>
                        <SelectItem value="Mexico">Mexico</SelectItem>
                        <SelectItem value="Morocco">Morocco</SelectItem>
                        <SelectItem value="Mozambique">Mozambique</SelectItem>
                        <SelectItem value="Myanmar">Myanmar</SelectItem>
                        <SelectItem value="Nepal">Nepal</SelectItem>
                        <SelectItem value="Netherlands">Netherlands</SelectItem>
                        <SelectItem value="New Zealand">New Zealand</SelectItem>
                        <SelectItem value="Niger">Niger</SelectItem>
                        <SelectItem value="Nigeria">Nigeria</SelectItem>
                        <SelectItem value="Norway">Norway</SelectItem>
                        <SelectItem value="Pakistan">Pakistan</SelectItem>
                        <SelectItem value="Peru">Peru</SelectItem>
                        <SelectItem value="Philippines">Philippines</SelectItem>
                        <SelectItem value="Poland">Poland</SelectItem>
                        <SelectItem value="Portugal">Portugal</SelectItem>
                        <SelectItem value="Qatar">Qatar</SelectItem>
                        <SelectItem value="Romania">Romania</SelectItem>
                        <SelectItem value="Russia">Russia</SelectItem>
                        <SelectItem value="Rwanda">Rwanda</SelectItem>
                        <SelectItem value="Saudi Arabia">Saudi Arabia</SelectItem>
                        <SelectItem value="Senegal">Senegal</SelectItem>
                        <SelectItem value="Sierra Leone">Sierra Leone</SelectItem>
                        <SelectItem value="Singapore">Singapore</SelectItem>
                        <SelectItem value="Somalia">Somalia</SelectItem>
                        <SelectItem value="South Africa">South Africa</SelectItem>
                        <SelectItem value="South Korea">South Korea</SelectItem>
                        <SelectItem value="South Sudan">South Sudan</SelectItem>
                        <SelectItem value="Spain">Spain</SelectItem>
                        <SelectItem value="Sri Lanka">Sri Lanka</SelectItem>
                        <SelectItem value="Sudan">Sudan</SelectItem>
                        <SelectItem value="Sweden">Sweden</SelectItem>
                        <SelectItem value="Switzerland">Switzerland</SelectItem>
                        <SelectItem value="Syria">Syria</SelectItem>
                        <SelectItem value="Tanzania">Tanzania</SelectItem>
                        <SelectItem value="Thailand">Thailand</SelectItem>
                        <SelectItem value="Togo">Togo</SelectItem>
                        <SelectItem value="Tunisia">Tunisia</SelectItem>
                        <SelectItem value="Turkey">Turkey</SelectItem>
                        <SelectItem value="Uganda">Uganda</SelectItem>
                        <SelectItem value="Ukraine">Ukraine</SelectItem>
                        <SelectItem value="United Arab Emirates">United Arab Emirates</SelectItem>
                        <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                        <SelectItem value="United States">United States</SelectItem>
                        <SelectItem value="Venezuela">Venezuela</SelectItem>
                        <SelectItem value="Vietnam">Vietnam</SelectItem>
                        <SelectItem value="Yemen">Yemen</SelectItem>
                        <SelectItem value="Zambia">Zambia</SelectItem>
                        <SelectItem value="Zimbabwe">Zimbabwe</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>State</Label>
                    <Select
                      key={formData.country}
                      onValueChange={(val) => handleInputChange("state", val)}
                      disabled={!formData.country}
                    >
                      <SelectTrigger className="bg-gray-50/50 border-gray-200 h-12 w-full">
                        <SelectValue placeholder={formData.country ? "Select State" : "Select a country first"} />
                      </SelectTrigger>
                      <SelectContent>
                        {(COUNTRY_STATES[formData.country] ?? []).map((s) => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address</Label>
                    <Input
                      id="address"
                      placeholder="Enter Street Address"
                      className="bg-gray-50/50 border-gray-200 h-12 w-full"
                      value={formData.streetAddress}
                      onChange={(e) =>
                        handleInputChange("streetAddress", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                      <Label htmlFor="zipCode">Zip Code</Label>
                      <Input
                        id="zipCode"
                        placeholder="Enter Zip Code"
                        className="bg-gray-50/50 border-gray-200 h-12 w-full"
                        value={formData.zipCode}
                        onChange={(e) =>
                          handleInputChange("zipCode", e.target.value)
                        }
                      />
                  </div>
                  </div>

                  {/* City field — commented out for now
                  <div className="space-y-2">
                    <Label>City</Label>
                    <Select
                      onValueChange={(val) => handleInputChange("city", val)}
                    >
                      <SelectTrigger className="bg-gray-50/50 border-gray-200 h-12 w-full">
                        <SelectValue placeholder="Select City" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Ikeja">Ikeja</SelectItem>
                        <SelectItem value="Lekki">Lekki</SelectItem>
                        <SelectItem value="Yaba">Yaba</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  */}
                </div>
              </section>

              {/* Delivery Address */}
              <section className="space-y-4">
                <h3 className="text-sm font-medium">Delivery Address</h3>
                <RadioGroup
                  defaultValue="same"
                  className="flex flex-col md:flex-row gap-4"
                  onValueChange={(val: string) =>
                    handleInputChange("deliveryAddressType", val)
                  }
                >
                  <div
                    className={`flex items-center space-x-2 border rounded-lg p-4 flex-1 transition-colors ${
                      formData.deliveryAddressType === "same"
                        ? "border-[#F10E7C] bg-[#fff0f7]"
                        : "border-gray-200"
                    }`}
                  >
                    <RadioGroupItem
                      value="same"
                      id="same"
                      className="text-[#F10E7C]"
                    />
                    <Label htmlFor="same" className="cursor-pointer">
                      Same as shipping address
                    </Label>
                  </div>
                  <div
                    className={`flex items-center space-x-2 border rounded-lg p-4 flex-1 transition-colors ${
                      formData.deliveryAddressType === "different"
                        ? "border-[#F10E7C] bg-[#fff0f7]"
                        : "border-gray-200"
                    }`}
                  >
                    <RadioGroupItem
                      value="different"
                      id="different"
                      className="text-[#F10E7C]"
                    />
                    <Label htmlFor="different" className="cursor-pointer">
                      Use a different billing address
                    </Label>
                  </div>
                </RadioGroup>

                {formData.deliveryAddressType === "different" && (
                  <div className="space-y-2 mt-4">
                    <Label htmlFor="differentAddress">Billing Address</Label>
                    <Input
                      id="differentAddress"
                      placeholder="Enter your billing address"
                      className="bg-gray-50/50 border-gray-200 h-12 w-full"
                      value={formData.differentAddress}
                      onChange={(e) =>
                        handleInputChange("differentAddress", e.target.value)
                      }
                    />
                  </div>
                )}
              </section>

              {/* Logistics — commented out for now
              <section className="space-y-4">
                <h3 className="text-sm font-medium">Logistics</h3>
                <RadioGroup
                  value={selectedLogistics}
                  onValueChange={setSelectedLogistics}
                  className="space-y-3"
                >
                  {LOGISTICS_OPTIONS.map((option) => (
                    <div
                      key={option.id}
                      className={`flex items-center justify-between border rounded-lg p-4 cursor-pointer transition-colors ${
                        selectedLogistics === option.id
                          ? "border-[#F10E7C] bg-gray-50"
                          : "border-gray-200"
                      }`}
                      onClick={() => setSelectedLogistics(option.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem
                          value={option.id}
                          id={option.id}
                          className="text-[#F10E7C]"
                        />
                        <div className="space-y-1">
                          <Label
                            htmlFor={option.id}
                            className="font-medium cursor-pointer"
                          >
                            {option.name}
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            Delivery Timeline: {option.time}
                          </p>
                        </div>
                      </div>
                      <span className="font-semibold">₦{option.price}</span>
                    </div>
                  ))}
                </RadioGroup>
              </section>
              */}
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-24">
                <h2 className="text-lg font-medium mb-6">Order Summary</h2>

                <Card className="p-6 border-none shadow-sm bg-white">
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">
                        ₦
                        {subtotal.toLocaleString("en-NG", {
                          minimumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                    {/* Shipping, Tax, Delivery — commented out (placeholder values)
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-medium">₦{shippingCost.toLocaleString("en-NG", { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax</span>
                      <span className="font-medium">₦{tax.toLocaleString("en-NG", { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Delivery</span>
                      <span className="font-medium">₦{deliveryCost.toLocaleString("en-NG", { minimumFractionDigits: 2 })}</span>
                    </div>
                    */}
                  </div>

                  <div className="border-t border-gray-100 pt-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Total</span>
                      <span className="text-xl font-bold text-[#F10E7C]">
                        ₦
                        {total.toLocaleString("en-NG", {
                          minimumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  </div>

                  {/* <div className="mb-6">
                    <Label className="text-xs mb-2 block">Promo Code</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter Code"
                        className="bg-gray-50/50"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                      />
                      <Button variant="outline" className="px-6">
                        Apply
                      </Button>
                    </div>
                  </div> */}

                  <Button
                    className="w-full bg-[#222] hover:bg-[#333] text-white h-12 rounded-lg"
                    onClick={handlePayment}
                    disabled={isProcessingPayment}
                  >
                    {isProcessingPayment ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        Processing...
                      </>
                    ) : (
                      "Proceed to Payment"
                    )}
                  </Button>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
