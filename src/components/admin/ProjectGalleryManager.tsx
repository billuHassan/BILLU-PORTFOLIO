import React, { useState, useRef } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Upload, Image as ImageIcon, X, Star, Plus } from 'lucide-react';

interface ProjectGalleryManagerProps {
  images: string[];
  onChange: (images: string[]) => void;
}

export const ProjectGalleryManager: React.FC<ProjectGalleryManagerProps> = ({
  images,
  onChange
}) => {
  const { data, uploadMediaFile } = usePortfolio();
  const [isUploading, setIsUploading] = useState(false);
  const [showLibrary, setShowLibrary] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const newUrls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const res = await uploadMediaFile(file, { name: file.name, usedIn: 'Project Screenshot' });
        if (res.success && res.url) {
          newUrls.push(res.url);
        }
      } catch (err) {
        console.error('Error uploading file:', err);
      }
    }

    if (newUrls.length > 0) {
      onChange([...images, ...newUrls]);
    }
    setIsUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeImage = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    onChange(updated);
  };

  const makeCover = (index: number) => {
    if (index === 0) return;
    const selected = images[index];
    const rest = images.filter((_, i) => i !== index);
    onChange([selected, ...rest]);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <label className="text-xs font-mono text-slate-300 font-semibold">
            Project Visual Gallery & Screenshots ({images.length})
          </label>
          <p className="text-[11px] text-slate-500 font-mono">
            First image serves as the primary card cover and 3D celestial planet texture.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />

          <button
            type="button"
            disabled={isUploading}
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow cursor-pointer disabled:opacity-50"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>{isUploading ? 'Uploading...' : '+ Upload Picture(s)'}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowLibrary(!showLibrary)}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5 border border-slate-700"
          >
            <ImageIcon className="w-3.5 h-3.5 text-indigo-400" />
            <span>Pick from Library</span>
          </button>
        </div>
      </div>

      {/* Media Library Picker Drawer */}
      {showLibrary && (
        <div className="p-3 rounded-2xl bg-slate-900 border border-indigo-500/40 space-y-2 animate-in fade-in">
          <div className="flex items-center justify-between text-xs font-mono text-slate-300">
            <span>Click any image to add to project gallery:</span>
            <button
              type="button"
              onClick={() => setShowLibrary(false)}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-40 overflow-y-auto p-1">
            {data.mediaAssets.map(asset => (
              <button
                key={asset.id}
                type="button"
                onClick={() => {
                  if (!images.includes(asset.url)) {
                    onChange([...images, asset.url]);
                  }
                  setShowLibrary(false);
                }}
                className="relative rounded-xl overflow-hidden h-20 border border-slate-800 hover:border-cyan-400 transition-all group"
              >
                <img src={asset.url} alt={asset.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-cyan-300 text-[10px] font-mono font-bold">
                  + Add
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Gallery Grid */}
      {images.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 p-3 rounded-2xl bg-slate-950 border border-slate-800">
          {images.map((img, index) => {
            const isCover = index === 0;
            return (
              <div
                key={index}
                className={`relative rounded-xl overflow-hidden bg-slate-900 border group ${
                  isCover ? 'border-cyan-500 ring-2 ring-cyan-500/20' : 'border-slate-800'
                }`}
              >
                <div className="h-28 w-full">
                  <img
                    src={img}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                </div>

                {/* Cover badge */}
                {isCover && (
                  <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-mono font-bold flex items-center gap-1 shadow">
                    <Star className="w-3 h-3 fill-slate-950" />
                    <span>COVER</span>
                  </div>
                )}

                {/* Hover overlay with action buttons */}
                <div className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="p-1.5 rounded-lg bg-rose-950/80 text-rose-300 hover:bg-rose-900"
                      title="Remove image"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {!isCover && (
                    <button
                      type="button"
                      onClick={() => makeCover(index)}
                      className="w-full py-1 rounded-lg bg-cyan-500/90 hover:bg-cyan-400 text-slate-950 font-bold text-[10px] font-mono"
                    >
                      Set as Cover
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-6 rounded-2xl bg-slate-950 border border-dashed border-slate-800 text-center text-slate-500 text-xs font-mono">
          No pictures attached to this project yet. Click "+ Upload Picture(s)" to add screenshots!
        </div>
      )}

      {/* Manual URL input option */}
      <div className="flex items-center gap-2 pt-1">
        <input
          type="url"
          placeholder="Or paste external screenshot URL..."
          value={urlInput}
          onChange={e => setUrlInput(e.target.value)}
          className="flex-1 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600"
        />
        <button
          type="button"
          onClick={() => {
            if (urlInput.trim()) {
              onChange([...images, urlInput.trim()]);
              setUrlInput('');
            }
          }}
          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 border border-slate-700"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add URL</span>
        </button>
      </div>
    </div>
  );
};
