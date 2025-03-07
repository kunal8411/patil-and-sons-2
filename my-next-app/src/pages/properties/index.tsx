// import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const Button = dynamic(
  () => import("@/components/ui/button").then((mod) => mod.default),
  { ssr: false }
);

import { Plus } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useEffect, useState } from "react";
import AddPropertyForm from "@/components/AddPropertyForm";
import { PropertyCard } from "@/components/PropertyCard";
import axios from "axios";
import type { Property } from "@/types/property";

export default function Properties() {
  const data = useAuth();
  const [showAddForm, setShowAddForm] = useState(false);
  const [allproperties, setAllProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response1 = await axios({
        //   "GET",
        //   url,
        //   data: body,
        //   params
        // });

        const response: any = await axios.get(
          // "https://patil-and-sons-backend.onrender.com/properties"

          "/api/properties"
        );
        console.log("datadatadatadata", response.data.allProperties);
        setAllProperties(response.data.allProperties);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array runs the effect once on mount

  // if (isLoading) {
  //   return (
  //     <div className="container mx-auto px-4 pt-24">
  //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  //         {[1, 2, 3, 4, 5, 6].map((i) => (
  //           <Card key={i} className="w-full h-[400px] animate-pulse" />
  //         ))}
  //       </div>
  //     </div>
  //   );
  // }
  console.log("allproperties", allproperties);
  if (loading) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-75 z-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }
  return (
    <main className="pt-24">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-playfair">Available Properties</h1>
          {data?.isAdmin && (
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Property
            </Button>
          )}
        </div>

        {showAddForm && (
          <div className="mb-8">
            <AddPropertyForm onClose={() => setShowAddForm(false)} />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allproperties &&
            allproperties.length > 0 &&
            allproperties?.map((property) => (
              <PropertyCard key={property?.id} property={property} />
            ))}
        </div>
      </div>
    </main>
  );
}
