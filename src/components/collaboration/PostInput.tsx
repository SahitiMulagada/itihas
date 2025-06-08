'use client';

import React, { useState, useRef, useEffect } from 'react';
import { type Template, type PostData, isControlEnabled } from './types';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  HiOutlinePhotograph,
  HiOutlineVideoCamera,
  HiOutlineDocument,
  HiOutlineLink,
  HiOutlineTag,
  HiOutlineClipboardList,
  HiOutlineCode,
  HiOutlineStar,
  HiOutlineLocationMarker,
  HiOutlineCalendar,
} from 'react-icons/hi';

interface PostInputProps {
  pst_grp_id: string;
  controls: string;
  tmllts: Template[];
  showTemplateSelector?: boolean;
  onSubmit: (data: PostData) => void;
}

export default function PostInput({ 
  pst_grp_id,
  controls,
  tmllts,
  showTemplateSelector = true,
  onSubmit,
}: PostInputProps) {
  // State hooks
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeControl, setActiveControl] = useState<number | null>(null);
  const [isRichEditor, setIsRichEditor] = useState(false);
  const [currentTag, setCurrentTag] = useState('');
  const [formData, setFormData] = useState<Partial<PostData>>({
    pst_grp_id,
    allowComments: false
  });

  // Ref hooks
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);

  // Editor hook
  const editor = useEditor({
    autofocus: false,
    extensions: [StarterKit],
    content: '',
    onUpdate: ({ editor }) => {
      setFormData(prev => ({ ...prev, htmlContent: editor.getHTML() }));
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm focus:outline-none min-h-[40px]',
      },
    },
  });

  // Cleanup editor on unmount
  useEffect(() => {
    return () => {
      editor?.destroy();
    };
  }, [editor]);

  // Initialize with default template
  useEffect(() => {
    if (tmllts.length === 1) {
      setSelectedTemplate(tmllts[0]);
    } else {
      const defaultTemplate = tmllts.find(t => t.dflt_in) || tmllts[0];
      setSelectedTemplate(defaultTemplate);
    }
  }, [tmllts]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTemplate) return;

    onSubmit({
      ...formData,
      pst_grp_id,
      tmplt_id: selectedTemplate.tmplt_id,
      allowComments: formData.allowComments || false
    } as PostData);

    // Reset form
    setFormData({ pst_grp_id, allowComments: false });
  };

  // Only enable rich editor when embedded content is enabled
  useEffect(() => {
    const shouldUseRichEditor = isControlEnabled(selectedTemplate?.cntrl_tx || '', 7);
    setIsRichEditor(shouldUseRichEditor);
    if (shouldUseRichEditor && editor) {
      editor.commands.setContent(formData.htmlContent || '');
    }
  }, [selectedTemplate, editor]);

  const toggleControl = (control: number | null) => {
    if (activeControl === control) {
      setActiveControl(null);
    } else {
      setActiveControl(control);
      setIsExpanded(true);
    }
  };

  const handleFileUpload = (type: 'images' | 'videos' | 'documents') => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [type]: Array.from(e.target.files || [])
    });
    // Reset file input
    e.target.value = '';
  };

  const renderIcon = (control: number, Icon: React.ElementType) => {
    if (!selectedTemplate || !isControlEnabled(selectedTemplate.cntrl_tx, control)) return null;

    const handleClick = () => {
      // For file uploads, trigger the file input directly
      if (control === 4) imageInputRef.current?.click();
      else if (control === 5) videoInputRef.current?.click();
      else if (control === 6) documentInputRef.current?.click();
      else toggleControl(control);
    };

    return (
      <button
        type="button"
        onClick={handleClick}
        className={`p-2 hover:bg-gray-100 rounded-full transition-colors ${activeControl === control ? 'text-indigo-600 bg-gray-100' : 'text-gray-600'}`}
        title={getControlTitle(control)}
      >
        <Icon className="w-5 h-5" />
      </button>
    );
  };

  const getControlTitle = (control: number): string => {
    switch (control) {
      case 1: return 'Add Location';
      case 2: return 'Add Dates';
      case 3: return 'Share';
      case 4: return 'Add Images';
      case 5: return 'Add Videos';
      case 6: return 'Add Documents';
      case 7: return 'Add Embedded Content';
      case 8: return 'Add Tags';
      case 9: return 'Create Poll';
      case 10: return 'Add HTML Content';
      case 11: return 'Add Review';
      default: return '';
    }
  };

  if (!selectedTemplate) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Hidden file inputs */}
      <input
          type="file"
          ref={imageInputRef}
          multiple
          accept="image/*"
          onChange={handleFileUpload('images')}
          className="hidden"
      />
      <input
        type="file"
        ref={videoInputRef}
        accept="video/*"
        onChange={handleFileUpload('videos')}
        className="hidden"
      />
      <input
        type="file"
        ref={documentInputRef}
        multiple
        onChange={handleFileUpload('documents')}
        className="hidden"
      />
      <div className="p-4 space-y-4">
        {showTemplateSelector && (
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2 -mx-4 px-4">
            {tmllts.map((template) => (
              <button
                key={template.tmplt_id}
                onClick={() => setSelectedTemplate(template)}
                className={`flex items-center p-2 rounded-full transition-all whitespace-nowrap ${
                  selectedTemplate?.tmplt_id === template.tmplt_id
                    ? 'bg-gray-100'
                    : 'hover:bg-gray-50'
                }`}
              >
                {template.icn_tx && (
                  <span className="mr-2" style={{ color: template.clr_cd }}>
                    <HiOutlineDocument className="w-5 h-5" />
                  </span>
                )}
                <span className="text-sm font-medium">{template.tmplt_nm}</span>
              </button>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div 
            onClick={() => !isExpanded && setIsExpanded(true)}
            className={`border rounded-lg p-3 ${isExpanded ? 'border-gray-300' : 'border-gray-200 hover:border-gray-300 cursor-pointer'}`}
          >
            {isControlEnabled(selectedTemplate?.cntrl_tx || '', 7) ? (
              <div className="min-h-[40px]">
                <EditorContent
                  editor={editor}
                  className="prose prose-sm max-w-none focus:outline-none"
                />
              </div>
            ) : (
              <textarea
                value={formData.content || ''}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder={`What's on your mind?${selectedTemplate?.dscn_tx ? `\n\n${selectedTemplate.dscn_tx}` : ''}`}
                rows={isExpanded ? 4 : 2}
                className="w-full resize-none border-0 focus:ring-0 p-0 text-gray-900 placeholder:text-gray-500"
              />
            )}
          </div>

          {isExpanded && activeControl && (
            <div className="space-y-4 mt-4 animate-fade-in">
              {/* Dynamic content based on active control */}
              {/* Location */}
              {activeControl === 1 && (
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                  <HiOutlineLocationMarker className="w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    value={formData.location || ''}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="flex-1 bg-transparent border-0 focus:ring-0"
                    placeholder="Add location"
                    autoFocus
                  />
                </div>
              )}

              {/* Dates */}
              {activeControl === 2 && (
                <div className="flex items-center gap-4 p-2 bg-gray-50 rounded-lg">
                  <HiOutlineCalendar className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  <div className="flex-1 grid grid-cols-2 gap-4">
                    <input
                      type="datetime-local"
                      value={formData.dates?.start?.toISOString().slice(0, 16) || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        dates: {
                          ...formData.dates,
                          start: new Date(e.target.value)
                        }
                      })}
                      className="bg-white border border-gray-200 rounded px-2 py-1 text-sm"
                      autoFocus
                    />
                    <input
                      type="datetime-local"
                      value={formData.dates?.end?.toISOString().slice(0, 16) || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        dates: {
                          ...formData.dates,
                          end: new Date(e.target.value)
                        }
                      })}
                      className="bg-white border border-gray-200 rounded px-2 py-1 text-sm"
                    />
                  </div>
                </div>
              )}

              {/* Description */}
              {isControlEnabled(selectedTemplate?.cntrl_tx || '', 3) && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <textarea
                    placeholder="Description"
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full min-h-[100px] bg-white border border-gray-200 rounded p-2 text-sm"
                  />
                </div>
              )}

              {/* Tags */}
              {activeControl === 8 && (
                <div className="p-4 bg-gray-50 rounded-lg space-y-3">
                  <div className="flex items-center gap-2">
                    <HiOutlineTag className="w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      className="flex-1 bg-white px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter a tag"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && currentTag.trim()) {
                          e.preventDefault();
                          setFormData({
                            ...formData,
                            tags: [...(formData.tags || []), currentTag.trim()]
                          });
                          setCurrentTag('');
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (currentTag.trim()) {
                          setFormData({
                            ...formData,
                            tags: [...(formData.tags || []), currentTag.trim()]
                          });
                          setCurrentTag('');
                        }
                      }}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  {formData.tags && formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag, index) => (
                        <div 
                          key={index}
                          className="flex items-center gap-1 bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => setFormData({
                              ...formData,
                              tags: formData.tags?.filter((_, i) => i !== index)
                            })}
                            className="text-indigo-600 hover:text-indigo-800"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Poll */}
              {activeControl === 9 && (
                <div className="p-4 bg-gray-50 rounded-lg space-y-3">
                  <div className="flex items-center gap-2">
                    <HiOutlineClipboardList className="w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      value={formData.poll?.question || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        poll: { ...formData.poll, question: e.target.value, options: formData.poll?.options || [] }
                      })}
                      className="flex-1 bg-white px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Ask a question..."
                      autoFocus
                    />
                  </div>
                  <textarea
                    value={formData.poll?.options?.join('\n') || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      poll: {
                        ...formData.poll,
                        question: formData.poll?.question || '',
                        options: e.target.value.split('\n').filter(opt => opt.trim())
                      }
                    })}
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Add options (one per line)"
                  />
                </div>
              )}

              {/* HTML Content */}
              {isControlEnabled(selectedTemplate?.cntrl_tx || '', 10) && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    HTML Content
                  </label>
                  <textarea
                    value={formData.htmlContent || ''}
                    onChange={(e) => setFormData({ ...formData, htmlContent: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                    placeholder="Enter HTML content"
                  />
                </div>
              )}

              {/* Review */}
              {isControlEnabled(selectedTemplate?.cntrl_tx || '', 11) && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Review
                  </label>
                  <div className="space-y-3">
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={formData.review?.rating || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        review: { ...formData.review, rating: Number(e.target.value) }
                      })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Rating (1-5)"
                    />
                    <textarea
                      value={formData.review?.text || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        review: { ...formData.review, text: e.target.value }
                      })}
                      rows={4}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Review text"
                    />
                  </div>
                </div>
              )}

              {/* Allow Comments */}
              {isControlEnabled(selectedTemplate?.cntrl_tx || '', 12) && (
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.allowComments || false}
                    onChange={(e) => setFormData({ ...formData, allowComments: e.target.checked })}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">
                    Allow comments on this post
                  </label>
                </div>
              )}
            </div>
          )}

          <div className="flex items-center justify-between mt-4 pt-3 border-t">
            <div className="flex -ml-2">
              {renderIcon(4, HiOutlinePhotograph)}
              {renderIcon(5, HiOutlineVideoCamera)}
              {renderIcon(6, HiOutlineDocument)}
              {renderIcon(7, HiOutlineLink)}
              {renderIcon(8, HiOutlineTag)}
              {renderIcon(9, HiOutlineClipboardList)}
              {renderIcon(10, HiOutlineCode)}
              {renderIcon(11, HiOutlineStar)}
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              Post
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
