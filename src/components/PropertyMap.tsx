import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Layers, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface PropertyMapProps {
  address?: string;
  measurements?: any[];
  onAreaSelect?: (area: any) => void;
}

export const PropertyMap = ({ address, measurements = [], onAreaSelect }: PropertyMapProps) => {
  const [selectedArea, setSelectedArea] = useState<any>(null);
  const [mapMode, setMapMode] = useState<'satellite' | 'street'>('satellite');
  const [zoom, setZoom] = useState(16);
  const [areas, setAreas] = useState<any[]>([]);

  // Mock property areas for demonstration
  useEffect(() => {
    setAreas([
      { id: 1, type: 'driveway', name: 'Main Driveway', x: 20, y: 30, width: 60, height: 20, color: '#3b82f6' },
      { id: 2, type: 'flowerbed', name: 'Front Garden', x: 10, y: 60, width: 40, height: 30, color: '#10b981' },
      { id: 3, type: 'flowerbed', name: 'Side Garden', x: 70, y: 70, width: 25, height: 25, color: '#10b981' },
      { id: 4, type: 'walkway', name: 'Front Walk', x: 45, y: 50, width: 10, height: 40, color: '#6b7280' }
    ]);
  }, []);

  const handleAreaClick = (area: any) => {
    setSelectedArea(area);
    onAreaSelect?.(area);
  };

  const getMeasurementForArea = (areaId: number) => {
    return measurements.find(m => m.areaId === areaId);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Property Map
          {address && <span className="text-sm text-gray-600">- {address}</span>}
        </CardTitle>
        <div className="flex gap-2">
          <Button
            variant={mapMode === 'satellite' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMapMode('satellite')}
          >
            <Layers className="h-4 w-4 mr-1" />
            Satellite
          </Button>
          <Button
            variant={mapMode === 'street' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMapMode('street')}
          >
            Street
          </Button>
          <Button variant="outline" size="sm" onClick={() => setZoom(z => Math.min(z + 1, 20))}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => setZoom(z => Math.max(z - 1, 10))}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => setZoom(16)}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Map Container */}
          <div 
            className={`w-full h-96 rounded-lg border-2 border-gray-300 relative overflow-hidden ${
              mapMode === 'satellite' ? 'bg-green-100' : 'bg-gray-100'
            }`}
            style={{ 
              backgroundImage: mapMode === 'satellite' 
                ? 'radial-gradient(circle at 30% 70%, #22c55e 0%, #16a34a 50%, #15803d 100%)'
                : 'linear-gradient(45deg, #f3f4f6 25%, transparent 25%), linear-gradient(-45deg, #f3f4f6 25%, transparent 25%)'
            }}
          >
            {/* Property Areas */}
            {areas.map((area) => {
              const measurement = getMeasurementForArea(area.id);
              return (
                <div
                  key={area.id}
                  className={`absolute cursor-pointer border-2 rounded transition-all duration-200 ${
                    selectedArea?.id === area.id 
                      ? 'border-yellow-400 bg-yellow-200 bg-opacity-50 scale-105' 
                      : 'border-white bg-opacity-30 hover:bg-opacity-50'
                  }`}
                  style={{
                    left: `${area.x}%`,
                    top: `${area.y}%`,
                    width: `${area.width}%`,
                    height: `${area.height}%`,
                    backgroundColor: area.color
                  }}
                  onClick={() => handleAreaClick(area)}
                  title={area.name}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-medium text-white bg-black bg-opacity-50 px-1 rounded">
                      {area.name}
                    </span>
                  </div>
                  {measurement && (
                    <div className="absolute -top-6 left-0 bg-blue-600 text-white text-xs px-1 rounded">
                      {measurement.length}' x {measurement.width}'
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Selected Area Info */}
          {selectedArea && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900">{selectedArea.name}</h4>
              <p className="text-sm text-blue-700 capitalize">Type: {selectedArea.type}</p>
              {getMeasurementForArea(selectedArea.id) ? (
                <p className="text-sm text-green-700">✓ Measured</p>
              ) : (
                <p className="text-sm text-orange-700">⚠ Not measured</p>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};