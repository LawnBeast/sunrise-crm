import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Camera, Plus } from "lucide-react";
import { PropertyMap } from "./PropertyMap";

interface MeasurementFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export const MeasurementForm = ({ onSubmit, onCancel }: MeasurementFormProps) => {
  const [formData, setFormData] = useState({
    type: "",
    material: "",
    length: "",
    width: "",
    depth: "",
    area: "",
    location: "",
    notes: "",
    photos: [] as File[],
    selectedArea: null as any
  });
  const [showMap, setShowMap] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      areaId: formData.selectedArea?.id
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        photos: [...prev.photos, ...Array.from(e.target.files!)]
      }));
    }
  };

  const handleAreaSelect = (area: any) => {
    setFormData(prev => ({
      ...prev,
      selectedArea: area,
      type: area.type,
      location: `${area.name} - Property Area`
    }));
  };

  return (
    <div className="space-y-6">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Add New Measurement</CardTitle>
          <div className="flex gap-2">
            <Button 
              type="button" 
              variant={showMap ? "default" : "outline"}
              size="sm"
              onClick={() => setShowMap(!showMap)}
            >
              <MapPin className="h-4 w-4 mr-1" />
              {showMap ? "Hide Map" : "Show Property Map"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showMap && (
            <div className="mb-6">
              <PropertyMap 
                address={formData.location}
                onAreaSelect={handleAreaSelect}
              />
              {formData.selectedArea && (
                <div className="mt-2 p-2 bg-blue-50 rounded text-sm">
                  Selected: {formData.selectedArea.name} ({formData.selectedArea.type})
                </div>
              )}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type">Project Type</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flowerbed">Flower Bed</SelectItem>
                    <SelectItem value="driveway">Driveway (Snow Removal)</SelectItem>
                    <SelectItem value="walkway">Walkway</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {formData.type === "flowerbed" && (
                <div>
                  <Label htmlFor="material">Material</Label>
                  <Select value={formData.material} onValueChange={(value) => setFormData(prev => ({ ...prev, material: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select material" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mulch">Mulch</SelectItem>
                      <SelectItem value="topsoil">Topsoil</SelectItem>
                      <SelectItem value="stone">Stone</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="length">Length (ft)</Label>
                <Input
                  id="length"
                  type="number"
                  value={formData.length}
                  onChange={(e) => setFormData(prev => ({ ...prev, length: e.target.value }))}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="width">Width (ft)</Label>
                <Input
                  id="width"
                  type="number"
                  value={formData.width}
                  onChange={(e) => setFormData(prev => ({ ...prev, width: e.target.value }))}
                  placeholder="0"
                />
              </div>
              {formData.type === "flowerbed" && (
                <div>
                  <Label htmlFor="depth">Depth (in)</Label>
                  <Input
                    id="depth"
                    type="number"
                    value={formData.depth}
                    onChange={(e) => setFormData(prev => ({ ...prev, depth: e.target.value }))}
                    placeholder="0"
                  />
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="location">Location/Address</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="Enter address or location"
              />
            </div>

            <div>
              <Label htmlFor="photos">Photos</Label>
              <div className="flex gap-2">
                <Input
                  id="photos"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="flex-1"
                />
                <Button type="button" variant="outline" size="icon">
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              {formData.photos.length > 0 && (
                <p className="text-sm text-gray-600 mt-1">
                  {formData.photos.length} photo(s) selected
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Additional notes or specifications"
                rows={3}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex-1">
                <Plus className="h-4 w-4 mr-2" />
                Add Measurement
              </Button>
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};