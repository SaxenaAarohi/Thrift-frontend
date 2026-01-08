import React, { useState } from 'react';
import { ItemCondition, ThriftItem } from '../types';
import { useUser } from '@clerk/clerk-react';
import { toast } from 'react-toastify';

interface AddItemFormProps {
  onSubmit: (item: Omit<ThriftItem, 'id' | 'createdAt' | 'status'>) => void;
  onCancel: () => void;
}

export const AddItemForm = ({ onSubmit, onCancel }) => {

  const { user } = useUser();
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    condition: ItemCondition.GOOD,
    imageUrl: '',
    brand: '',
    category: '',
    size: '',
    tags: '',
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadToCloudinary = async (file: File | null) => {
    const Formdata = new FormData();
    Formdata.append('file', file as Blob);
    Formdata.append('upload_preset', 'ThriftStore');

    const res = await fetch('https://api.cloudinary.com/v1_1/dzlo3niyu/image/upload', {
      method: 'POST',
      body: Formdata,
    });

    if (!res.ok) throw new Error("Image upload failed");

    const data = await res.json();
    return data.secure_url as string;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.price || !imageFile) return;

    try {
      setIsUploading(true);
      const imgurl = await uploadToCloudinary(imageFile);

      const res = await fetch(`${(import.meta as any).env.VITE_API_URL}/api/products/uploadproduct`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          price: parseFloat(formData.price),
          condition: formData.condition,
          imageUrl: imgurl,
          seller_id: user?.id,
          brand: formData.brand,
          category: formData.category,
          size: formData.size,
          tags: formData.tags.split(',').map(tag => tag.trim()),
        })
      });

      if (!res.ok) throw new Error("Failed to save item");

      const savedItem = await res.json();
       localStorage.removeItem("product");
 window.scrollTo({ top: 0, behavior: 'smooth' });
      toast.success("Item listed successfully!");

    }
    catch (error) {
      console.error("Submit failed:", error);
    } finally {
      setIsUploading(false);
    }

  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Image Upload */}
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-700">Item Image</label>
            <div
              className={`relative border-2 border-dashed rounded-3xl h-80 flex flex-col items-center justify-center transition-all ${imagePreview ? 'border-pop-pink  bg-pop-pink' : 'border-gray-200 hover:border-pop-pink bg-gray-50/30'
                }`}
            >
              {imagePreview ? (
                <>
                  <img src={imagePreview} alt="Preview" className="h-full w-full object-cover rounded-[1.4rem]" />
                  <button
                    type="button"
                    onClick={() => setImagePreview(null)}
                    className="absolute top-4 right-4 bg-white/90 backdrop-blur p-2 rounded-full shadow-lg hover:bg-white text-red-500"
                  >
                    🗑️
                  </button>
                </>
              ) : (
                <div className="text-center p-6">
                  <span className="text-4xl mb-4 block">📸</span>
                  <p className="text-sm font-medium text-gray-600 mb-1">Click to upload photo</p>
                  <p className="text-xs text-gray-400">PNG, JPG, up to 10MB</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              )}
            </div>
            <p className="text-xs text-gray-400 flex items-center gap-1 italic">
              ✨ Tip: Use bright, natural lighting for better sales.
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Item Title</label>
              <input
                type="text"
                placeholder="e.g. 1970s Vintage Records"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pop-pink focus:border-pop-pink transition-all outline-none"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Brand</label>
              <input
                type="text"
                placeholder="e.g. Voga,H&M"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pop-pink focus:border-pop-pink transition-all outline-none"
                value={formData.brand}
                onChange={e => setFormData({ ...formData, brand: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <input
                type="text"
                placeholder="e.g. Tops,Bottoms"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pop-pink focus:border-pop-pink transition-all outline-none"
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Size</label>
              <input
                type="text"
                placeholder="e.g. M, L, 10 inches"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pop-pink focus:border-pop-pink transition-all outline-none"
                value={formData.size}
                onChange={e => setFormData({ ...formData, size: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tags (comma separated)</label>
              <input
                type="text"
                placeholder="vintage, rare, collectible"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pop-pink focus:border-pop-pink transition-all outline-none"
                value={formData.tags}
                onChange={e => setFormData({ ...formData, tags: e.target.value })}
              />
            </div>

            <div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Price ($)</label>
                <input
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pop-pink focus:border-pop-pink transition-all outline-none"
                  value={formData.price}
                  onChange={e => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Condition</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {Object.values(ItemCondition).map((cond) => (
                  <button
                    key={cond}
                    type="button"
                    onClick={() => setFormData({ ...formData, condition: cond })}
                    className={`px-3 py-2 text-xs rounded-lg border transition-all ${formData.condition === cond
                      ? 'bg-pop-pink border-pop-pink text-white font-bold'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-pop-pink'
                      }`}
                  >
                    {cond}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-4 pt-6 border-t">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 rounded-xl font-semibold text-gray-600 hover:bg-gray-100 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-10 py-3 rounded-xl font-semibold bg-pop-pink hover:bg-pop-pink text-white shadow-lg shadow-pop-pink/20 transition-all"
          >
            List Item Now
          </button>
        </div>
      </form>
    </div>
  );
};
