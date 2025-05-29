"use client";

import { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';

interface RegistrationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}




interface ChildInfo {
  id: string;
  childName: string;
  dateOfBirth: string;
  school: string;
  class: string;
  flatNo: string;
  email: string;
  personalNote?: string;
}

interface FormData {
  childName: string;
  dateOfBirth: string;
  school: string;
  class: string;
  flatNo: string;
  email: string;
  personalNote?: string;
  stallName?: string;
  stallDescription?: string;
  category?: string;
  otherNotes?: string;
  paymentScreenshot?: File;
}

interface StallInfo {
  name: string;
  description: string;
  category: 'Food' | 'Craft' | 'Social cause' | 'Games' | 'Others';
  otherNotes?: string;
}

interface PaymentInfo {
  paymentScreenshot?: File;
}

const CLASSES = ['IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

const calculateMinMaxDates = () => {
  // Use a fixed date for consistent server/client rendering
  const baseDate = '2025-05-29';
  const today = new Date(baseDate);
  const minDate = new Date(baseDate);
  const maxDate = new Date(baseDate);
  
  minDate.setFullYear(today.getFullYear() - 18); // 18 years ago
  maxDate.setFullYear(today.getFullYear() - 8);  // 8 years ago
  
  return {
    min: minDate.toISOString().split('T')[0],
    max: maxDate.toISOString().split('T')[0]
  };
};

export default function RegistrationPanel({ isOpen, onClose }: RegistrationPanelProps) {
  const [step, setStep] = useState(1);
  const [children, setChildren] = useState<ChildInfo[]>([]);
  
  const { register, handleSubmit, reset, formState: { errors }, watch, setValue } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const dateRange = calculateMinMaxDates();

  const handleNext = () => {
    setStep(prev => Math.min(prev + 1, 3));
  };

  const handleBack = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const onSubmit = async (data: FormData) => {
    if (step === 1) {
      if (!data.childName || !data.email) {
        alert('Please fill in all required fields');
        return;
      }

      // Add new child to the list
      const newChild: ChildInfo = {
        id: `child-${children.length + 1}`,
        childName: data.childName,
        dateOfBirth: data.dateOfBirth,
        school: data.school,
        class: data.class,
        flatNo: data.flatNo,
        email: data.email,
        personalNote: data.personalNote
      };

      setChildren([...children, newChild]);
      handleNext(); // Automatically move to next step
    } else if (step === 2) {
      // Validate stall information
      if (!data.stallName || !data.stallDescription || !data.category) {
        return; // Form validation will show the error messages
      }
      handleNext();
    } else if (step === 3) {
      if (!data.paymentScreenshot) {
        alert('Please upload the payment screenshot');
        return;
      }
      console.log('Form submitted:', { 
        entrepreneur: children[0],
        stallInfo: {
          name: data.stallName,
          description: data.stallDescription,
          category: data.category,
          otherNotes: data.otherNotes
        }
      });
      // Handle form submission
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className={`fixed inset-y-0 right-0 w-full bg-white shadow-xl transition-transform duration-300 transform ${!isOpen ? 'translate-x-full' : ''}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold">Register for BizKids</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 pt-4">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= num ? 'bg-blue-600 text-white' : 'bg-gray-200'
                }`}>
                  {num}
                </div>
                {num < 3 && (
                  <div className={`w-24 h-1 ${step > num ? 'bg-blue-600' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Personal Info</span>
            <span>Stall Details</span>
            <span>Payment</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 overflow-y-auto" style={{ height: 'calc(100vh - 200px)' }}>
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Child Information</h3>
              <div className="bg-blue-50 p-4 rounded-lg mb-4 text-sm text-blue-700">
                <p>Note: Additional family members and parent/guardian details can be added after completing the initial registration.</p>
              </div>
              
              {/* Add Child Form */}
              <div className="bg-gray-50 p-6 rounded-lg border space-y-4">
                <h4 className="text-lg font-medium">Young Entrepreneur</h4>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Young Entrepreneur's Name *</label>
                  <input
                    type="text"
                    {...register('childName', { 
                      required: 'Child name is required',
                      pattern: {
                        value: /^[A-Za-z\s]{2,50}$/,
                        message: 'Name should contain only letters and spaces, 2-50 characters'
                      }
                    })}
                    className={`w-full p-2 border rounded-md ${errors.childName ? 'border-red-500' : ''}`}
                  />
                  {errors.childName && (
                    <p className="text-red-500 text-sm mt-1">{errors.childName.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
                  <input
                    type="date"
                    {...register('dateOfBirth', { 
                      required: 'Date of birth is required',
                      min: {
                        value: dateRange.min,
                        message: 'Child must be under 18 years old'
                      },
                      max: {
                        value: dateRange.max,
                        message: 'Child must be at least 8 years old'
                      }
                    })}
                    min={dateRange.min}
                    max={dateRange.max}
                    className={`w-full p-2 border rounded-md ${errors.dateOfBirth ? 'border-red-500' : ''}`}
                  />
                  {errors.dateOfBirth && (
                    <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Class *</label>
                  <select
                    {...register('class', { required: 'Class is required' })}
                    className={`w-full p-2 border rounded-md ${errors.class ? 'border-red-500' : ''}`}
                  >
                    <option value="">Select Class</option>
                    {CLASSES.map((cls) => (
                      <option key={cls} value={cls}>{cls}</option>
                    ))}
                  </select>
                  {errors.class && (
                    <p className="text-red-500 text-sm mt-1">{errors.class.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">School *</label>
                  <input
                    type="text"
                    {...register('school', { 
                      required: 'School name is required',
                      pattern: {
                        value: /^[A-Za-z\s]{3,50}$/,
                        message: 'School name should contain only letters and spaces, 3-50 characters'
                      }
                    })}
                    className={`w-full p-2 border rounded-md ${errors.school ? 'border-red-500' : ''}`}
                  />
                  {errors.school && (
                    <p className="text-red-500 text-sm mt-1">{errors.school.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Flat No. *</label>
                  <input
                    type="text"
                    {...register('flatNo', { 
                      required: 'Flat number is required',
                      pattern: {
                        value: /^[A-Z][0-9]{4}$/,
                        message: 'Format: Block letter followed by 4 digits (e.g., K1310)'
                      }
                    })}
                    placeholder="e.g., K1310"
                    className={`w-full p-2 border rounded-md ${errors.flatNo ? 'border-red-500' : ''}`}
                  />
                  {errors.flatNo && (
                    <p className="text-red-500 text-sm mt-1">{errors.flatNo.message}</p>
                  )}
                  <p className="text-sm text-gray-500">Rainbow Vistas @ Rock Garden</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    className={`w-full p-2 border rounded-md ${errors.email ? 'border-red-500' : ''}`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
           
              </div>

              {/* <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  disabled={!watch('childName')}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Child
                </button>
              </div> */}

              {/* Children Table */}
              {/* {children.length > 0 && (
                <div className="mt-8">
                  <h4 className="text-lg font-medium mb-4">Registered Children</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Child Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">School</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parents</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {children.map((child) => (
                          <tr key={child.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{child.childName}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{child.class}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{child.school}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>{child.fatherName}</div>
                              <div>{child.motherName}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <button
                                onClick={() => {
                                  setChildren(children.filter(c => c.id !== child.id));
                                }}
                                className="text-red-600 hover:text-red-800"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )} */}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Stall Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stall Name *</label>
                  <input
                    type="text"
                    {...register('stallName', { 
                      required: 'Stall name is required',
                      pattern: {
                        value: /^[A-Za-z0-9\s]{3,50}$/,
                        message: 'Stall name should contain only letters, numbers, and spaces (3-50 characters)'
                      }
                    })}
                    className={`w-full p-2 border rounded-md ${errors.stallName ? 'border-red-500' : ''}`}
                  />
                  {errors.stallName && (
                    <p className="text-red-500 text-sm mt-1">{errors.stallName.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stall Description *</label>
                  <textarea
                    {...register('stallDescription', { 
                      required: 'Stall description is required',
                      minLength: {
                        value: 20,
                        message: 'Description should be at least 20 characters long'
                      }
                    })}
                    rows={4}
                    className={`w-full p-2 border rounded-md ${errors.stallDescription ? 'border-red-500' : ''}`}
                  />
                  {errors.stallDescription && (
                    <p className="text-red-500 text-sm mt-1">{errors.stallDescription.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                  <select
                    {...register('category', { required: 'Please select a category' })}
                    className={`w-full p-2 border rounded-md ${errors.category ? 'border-red-500' : ''}`}
                  >
                    <option value="">Select a category</option>
                    <option value="Food">Food</option>
                    <option value="Craft">Craft</option>
                    <option value="Social cause">Social cause</option>
                    <option value="Games">Games</option>
                    <option value="Others">Others</option>
                  </select>
                  {errors.category && (
                    <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Other Notes/Instructions (Optional)</label>
                  <textarea
                    {...register('otherNotes')}
                    rows={3}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Payment</h3>
              
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <h4 className="font-medium text-blue-800 mb-3">Registration Summary</h4>
                  {children.length > 0 && (
                    <div className="space-y-4">
                      <div>
                        <h5 className="text-sm font-medium text-blue-900 mb-2">Young Entrepreneur Details</h5>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Name</p>
                            <p className="font-medium">{children[0].childName}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Date of Birth</p>
                            <p className="font-medium">{children[0].dateOfBirth}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">School</p>
                            <p className="font-medium">{children[0].school}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Class</p>
                            <p className="font-medium">{children[0].class}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Flat No.</p>
                            <p className="font-medium">{children[0].flatNo}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Email</p>
                            <p className="font-medium">{children[0].email}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-lg font-medium mb-2">Registration Fee: ₹200</p>
                  <div className="mb-4">
                    <Image
                      src="/projects/bizkids/payment-qr.jpg"
                      alt="Payment QR Code"
                      width={200}
                      height={200}
                      className="mx-auto"
                    />
                  </div>
                  <p className="text-sm text-gray-600">Scan the QR code above to make the payment</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Upload Payment Screenshot</label>
                  <input
                    type="file"
                    accept="image/*"
                    {...register('paymentScreenshot')}
                    className="w-full p-2 border rounded-md"
                  />
                </div>

                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-800">
                      Note: We will call you and confirm your stall registration within 24 hours.
                    </p>
                  </div>

                  {children.length > 0 && (
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-medium text-green-800 mb-2">Registration Summary</h4>
                      <p className="text-sm text-green-700 mb-2">
                        Number of children registering: {children.length}
                      </p>
                      <p className="text-sm text-green-700">
                        Total amount to pay: ₹{children.length * 200}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
              >
                Back
              </button>
            )}
            <button
              type="submit"
              className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : step === 3 ? 'Submit Registration' : 'Next'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
