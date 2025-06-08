'use client';

import { useState, useEffect } from 'react';
import { type PostInputProps, type Template, type PostData, isControlEnabled } from './types';
import { HiOutlineLocationMarker, HiOutlineCalendar, HiOutlinePhotograph, HiOutlineVideoCamera, HiOutlineDocument, HiOutlineLink, HiOutlineTag, HiOutlineClipboardList, HiOutlineCode, HiOutlineStar } from 'react-icons/hi';

const PostInput: React.FC<PostInputProps> = ({ pst_grp_id, tmllts, onSubmit }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState<Partial<PostData>>({
    pst_grp_id,
    allowComments: false
  });

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

  if (!selectedTemplate) return null;

  const showTemplateSelector = tmllts.length > 1;
  const controls = selectedTemplate.cntrl_tx;

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const renderIcon = (control: number, Icon: React.ElementType) => {
    if (!selectedTemplate || !isControlEnabled(selectedTemplate.cntrl_tx, control)) return null;
    return (
      <button
        type="button"
        onClick={toggleExpand}
        className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
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
      case 3: return 'Add Description';
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

  return (
    <div className="bg-white rounded-lg shadow-sm">
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
          <textarea
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder={`What's on your mind?${selectedTemplate?.dscn_tx ? `\n\n${selectedTemplate.dscn_tx}` : ''}`}
            rows={isExpanded ? 4 : 2}
            className="w-full resize-none border-0 focus:ring-0 p-0 text-gray-900 placeholder:text-gray-500"
          />
        </div>

        {isExpanded && (
          <div className="space-y-4 mt-4">
            {/* Location */}
            {isControlEnabled(controls, 1) && (
              <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                <HiOutlineLocationMarker className="w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  value={formData.location || ''}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="flex-1 bg-transparent border-0 focus:ring-0"
                  placeholder="Add location"
                />
              </div>
            )}

            {/* Dates */}
            {isControlEnabled(controls, 2) && (
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
            {isControlEnabled(controls, 3) && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter description"
                />
              </div>
            )}

            {/* File Uploads */}
            {(isControlEnabled(controls, 4) || isControlEnabled(controls, 5) || isControlEnabled(controls, 6)) && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {isControlEnabled(controls, 4) && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Images
                    </label>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => setFormData({
                        ...formData,
                        images: Array.from(e.target.files || [])
                      })}
                      className="w-full"
                    />
                  </div>
                )}
                {isControlEnabled(controls, 5) && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Videos
                    </label>
                    <input
                      type="file"
                      multiple
                      accept="video/*"
                      onChange={(e) => setFormData({
                        ...formData,
                        videos: Array.from(e.target.files || [])
                      })}
                      className="w-full"
                    />
                  </div>
                )}
                {isControlEnabled(controls, 6) && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Documents
                    </label>
                    <input
                      type="file"
                      multiple
                      onChange={(e) => setFormData({
                        ...formData,
                        documents: Array.from(e.target.files || [])
                      })}
                      className="w-full"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Embedded Content */}
            {isControlEnabled(controls, 7) && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Embedded Content
                </label>
                <textarea
                  value={formData.embeddedContent || ''}
                  onChange={(e) => setFormData({ ...formData, embeddedContent: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Paste embed code here"
                />
              </div>
            )}

            {/* Tags */}
            {isControlEnabled(controls, 8) && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  value={formData.tags?.join(', ') || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    tags: e.target.value.split(',').map(tag => tag.trim())
                  })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter tags separated by commas"
                />
              </div>
            )}

            {/* Poll */}
            {isControlEnabled(controls, 9) && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Poll
                </label>
                <input
                  type="text"
                  value={formData.poll?.question || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    poll: { ...formData.poll, question: e.target.value, options: formData.poll?.options || [] }
                  })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
                  placeholder="Poll question"
                />
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
                  placeholder="Enter poll options (one per line)"
                />
              </div>
            )}

            {/* HTML Content */}
            {isControlEnabled(controls, 10) && (
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
            {isControlEnabled(controls, 11) && (
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
            {isControlEnabled(controls, 12) && (
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
};

export default PostInput;
