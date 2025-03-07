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
        setLoading(true)
        const response: any = await axios.get("/api/properties");
        setAllProperties(response.data.allProperties);
        setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error);
      }finally{
        setLoading(false)
      }
    };

    fetchData();
  }, []); // Empty dependency array runs the effect once on mount

  console.log("allproperties", allproperties);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
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
              <Plus className="mr-2 h-5 w-5" />
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
