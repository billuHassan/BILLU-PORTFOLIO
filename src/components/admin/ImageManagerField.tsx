import React, { useState, useRef } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Upload, Image as ImageIcon, X, Check, Globe } from 'lucide-react';

interface ImageManagerFieldProps {
  label: string;
  sublabel?: string;
  value?: string;
  onChange: (url: string) => void;
  aspectRatio?: 'square' | 'video' | 'banner';
}

export const ImageManagerField: React.FC<ImageManagerFieldProps> = ({
  label,
  sublabel,
  value,
  onChange,
  aspectRatio = 'video'
}) => {
  const { data, uploadMediaFile } = usePortfolio();
  const [isUploading, setIsUploading] = useState(false);
  const [showLibraryPicker, setShowLibraryPicker] = useState(false);
  const [customUrlInput, setCustomUrlInput] = useState(false);
  const [inputUrl, setInputUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const res = await uploadMediaFile(file, { name: file.name, usedIn: label });
      if (res.success && res.url) {
        onChange(res.url);
      } else {
        alert(res.error || 'Failed to upload image');
      }
    } catch {
      alert('Error during image upload');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const aspectClass =
    aspectRatio === 'square'
      ? 'w-24 h-24 rounded-2xl'
      : aspectRatio === 'banner'
      ? 'w-full h-28 rounded-2xl'
      : 'w-44 h-28 rounded-2xl';

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-mono text-slate-300 font-semibold">{label}</label>
        {sublabel && <span className="text-[11px] text-slate-500 font-mono">{sublabel}</span>}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="flex flex-wrap items-start gap-4 p-3 rounded-2xl bg-slate-950 border border-slate-800">
        {/* Thumbnail Preview or Empty Placeholder */}
        {value ? (
          <div className={`relative ${aspectClass} overflow-hidden bg-slate-900 border border-slate-700 shrink-0 group`}>
            <img
              src={value}
              alt={label}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80';
              }}
            />
            <button
              type="button"
              onClick={() => onChange('')}
              className="absolute top-1.5 right-1.5 p-1 rounded-full bg-slate-950/80 hover:bg-rose-950 text-slate-300 hover:text-rose-400 transition-colors"
              title="Remove image"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className={`${aspectClass} border-2 border-dashed border-slate-800 flex flex-col items-center justify-center text-slate-500 shrink-0`}>
            <ImageIcon className="w-6 h-6 mb-1 opacity-50" />
            <span className="text-[10px] font-mono">No Image</span>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex-1 min-w-[200px] space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              disabled={isUploading}
              onClick={() => fileInputRef.current?.click()}
              className="px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer disabled:opacity-50"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{isUploading ? 'Uploading...' : 'Upload from Device'}</span>
            </button>

            <button
              type="button"
              onClick={() => setShowLibraryPicker(!showLibraryPicker)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 border border-slate-700"
            >
              <ImageIcon className="w-3.5 h-3.5 text-indigo-400" />
              <span>Media Library ({data.mediaAssets.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setCustomUrlInput(!customUrlInput)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1.5 border border-slate-700"
            >
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <span>Paste URL</span>
            </button>
          </div>

          {/* Current URL preview */}
          {value && (
            <div className="text-[11px] font-mono text-slate-400 truncate max-w-md">
              <span className="text-slate-500">Source:</span> {value}
            </div>
          )}

          {/* Manual URL input drawer */}
          {customUrlInput && (
            <div className="flex items-center gap-2 pt-1 animate-in fade-in">
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={inputUrl || ''}
                onChange={e => setInputUrl(e.target.value)}
                className="flex-1 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
              />
              <button
                type="button"
                onClick={() => {
                  if (inputUrl.trim()) {
                    onChange(inputUrl.trim());
                    setInputUrl('');
                    setCustomUrlInput(false);
                  }
                }}
                className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
              >
                Apply
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Media Library Quick Picker Popup */}
      {showLibraryPicker && (
        <div className="p-3 rounded-2xl bg-slate-900 border border-indigo-500/40 space-y-2 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-300">
            <span>Select from existing Media Assets:</span>
            <button
              type="button"
              onClick={() => setShowLibraryPicker(false)}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {data.mediaAssets.length === 0 ? (
            <div className="p-4 text-center text-xs text-slate-500 font-mono">
              No media uploaded yet. Use "Upload from Device" above to upload your first image!
            </div>
          ) : (
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-48 overflow-y-auto p-1">
              {data.mediaAssets.map(asset => {
                const isSelected = value === asset.url;
                return (
                  <button
                    key={asset.id}
                    type="button"
                    onClick={() => {
                      onChange(asset.url);
                      setShowLibraryPicker(false);
                    }}
                    className={`relative rounded-xl overflow-hidden h-20 border transition-all ${
                      isSelected
                        ? 'border-cyan-400 ring-2 ring-cyan-400/40 scale-95'
                        : 'border-slate-800 hover:border-slate-600'
                    }`}
                  >
                    <img
                      src={asset.url}
                      alt={asset.name}
                      className="w-full h-full object-cover"
                    />
                    {isSelected && (
                      <div className="absolute inset-0 bg-cyan-500/20 flex items-center justify-center">
                        <Check className="w-4 h-4 text-cyan-400" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
