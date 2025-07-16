import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, MapPin, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { MeasurementForm } from './MeasurementForm';
import { MeasurementList } from './MeasurementList';
import { PropertyMap } from './PropertyMap';
import { supabase } from '@/lib/supabase';

export const MeasurementsPage = () => {
  const [measurements, setMeasurements] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMeasurements();
  }, []);

  const fetchMeasurements = async () => {
    try {
      const { data, error } = await supabase
        .from('measurements')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setMeasurements(data || []);
    } catch (error) {
      console.error('Error fetching measurements:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMeasurement = async (data: any) => {
    try {
      const { error } = await supabase
        .from('measurements')
        .insert([{
          type: data.type,
          material: data.material,
          length: parseFloat(data.length) || 0,
          width: parseFloat(data.width) || 0,
          depth: parseFloat(data.depth) || 0,
          location: data.location,
          notes: data.notes,
          area_id: data.areaId
        }]);
      
      if (error) throw error;
      
      await fetchMeasurements();
      setShowForm(false);
    } catch (error) {
      console.error('Error adding measurement:', error);
    }
  };

  const filteredMeasurements = measurements.filter(measurement =>
    measurement.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    measurement.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    measurement.material?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (showForm) {
    return (
      <MeasurementForm
        onSubmit={handleAddMeasurement}
        onCancel={() => setShowForm(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Measurements</h1>
        <div className="flex gap-2">
          <Button
            variant={showMap ? "default" : "outline"}
            onClick={() => setShowMap(!showMap)}
          >
            <MapPin className="h-4 w-4 mr-2" />
            {showMap ? "Hide Map" : "Property Map"}
          </Button>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Measurement
          </Button>
        </div>
      </div>

      {showMap && (
        <PropertyMap
          measurements={measurements}
          address="Sample Property Address"
        />
      )}

      <Card>
        <CardHeader>
          <CardTitle>All Measurements</CardTitle>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search measurements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <MeasurementList measurements={filteredMeasurements} loading={loading} />
        </CardContent>
      </Card>
    </div>
  );
};