import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calculator, Edit, Trash2 } from "lucide-react";

interface MeasurementListProps {
  measurements: any[];
  loading: boolean;
}

export const MeasurementList = ({ measurements, loading }: MeasurementListProps) => {
  const getServiceColor = (service: string) => {
    switch (service) {
      case 'flowerbed': return 'bg-green-100 text-green-800';
      case 'driveway': return 'bg-blue-100 text-blue-800';
      case 'walkway': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateArea = (measurement: any) => {
    const length = parseFloat(measurement.length) || 0;
    const width = parseFloat(measurement.width) || 0;
    return length * width;
  };

  const calculateVolume = (measurement: any) => {
    const area = calculateArea(measurement);
    const depth = parseFloat(measurement.depth) || 0;
    return area * (depth / 12); // Convert inches to feet
  };

  if (loading) {
    return <div className="p-6">Loading measurements...</div>;
  }

  if (measurements.length === 0) {
    return (
      <div className="text-center py-12">
        <Calculator className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No measurements found</h3>
        <p className="text-gray-600">Get started by adding your first measurement.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {measurements.map((measurement) => (
        <Card key={measurement.id} className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Calculator className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">
                    {calculateArea(measurement).toFixed(1)} sq ft
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    {measurement.length}' x {measurement.width}'
                    {measurement.depth && ` x ${measurement.depth}"`}
                  </p>
                </div>
              </div>
              <Badge className={getServiceColor(measurement.type)}>
                {measurement.type}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{measurement.location || 'No location specified'}</span>
            </div>
            
            {measurement.material && (
              <div className="text-sm">
                <span className="font-medium">Material:</span> {measurement.material}
              </div>
            )}
            
            {measurement.type === 'flowerbed' && measurement.depth && (
              <div className="text-sm">
                <span className="font-medium">Volume:</span> {calculateVolume(measurement).toFixed(2)} cubic ft
              </div>
            )}
            
            {measurement.notes && (
              <p className="text-sm text-gray-600">{measurement.notes}</p>
            )}
            
            {measurement.area_id && (
              <div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                Mapped to property area
              </div>
            )}
            
            <div className="flex justify-between items-center pt-2">
              <span className="text-xs text-gray-500">
                Added {new Date(measurement.created_at).toLocaleDateString()}
              </span>
              <div className="flex gap-1">
                <Button variant="outline" size="sm">
                  <Edit className="w-3 h-3" />
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};