"use client"
import React, { useState } from 'react';
import { Wallet, CreditCard, FileText, TrendingUp, Check, ChevronLeft, ChevronRight, Loader2, AlertCircle } from 'lucide-react';
import { StatCard } from "@/components/(dashboards)/sellers-dashboard/stat-card";
import { useMyLoans, useLoanProducts, useLoanEligibility, useApplyLoan } from "@/hooks/useLoans";
import { useMember } from "@/hooks/useMember";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ILoanProduct, ILoanApplication, IEligibilityResponse } from "@/types/loan.types";

const LoanManagement = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'apply'>('overview');
  const [appStep, setAppStep] = useState<'select-product' | 'check-eligibility' | 'form'>('select-product');
  const [selectedProduct, setSelectedProduct] = useState<ILoanProduct | null>(null);
  const [eligibilityResult, setEligibilityResult] = useState<IEligibilityResponse | null>(null);
  
  const { data: myLoans, isLoading: loadingLoans } = useMyLoans();
  const { data: products, isLoading: loadingProducts } = useLoanProducts();
  const { data: member, isLoading: loadingMember } = useMember();
  
  const { mutate: checkEligibility, isPending: checkingEligibility } = useLoanEligibility();
  const { mutate: applyLoan, isPending: applyingLoan } = useApplyLoan();

  const [formData, setFormData] = useState<ILoanApplication>({
    loanProductId: '',
    location: '',
    businessInfo: {
      useCase: '',
      businessImpact: '',
      expectedSalesImpact: ''
    },
    guarantor: {
      fullName: '',
      memberId: '',
      relationship: '',
      phone: '',
      email: ''
    }
  });

  const activeLoan = myLoans?.find(l => l.status === 'approved' || l.status === 'disbursed');
  const totalRepaid = activeLoan?.repayments?.reduce((sum, r) => sum + r.amount, 0) || 0;
  const remaining = activeLoan ? activeLoan.amount - totalRepaid : 0;

  const handleProductSelect = (product: ILoanProduct) => {
    setSelectedProduct(product);
    setFormData(prev => ({ ...prev, loanProductId: product._id }));
    setAppStep('check-eligibility');
  };

  const runEligibilityCheck = () => {
    if (!selectedProduct) return;
    checkEligibility(selectedProduct._id, {
      onSuccess: (data: IEligibilityResponse | undefined) => {
        if (data) setEligibilityResult(data);
      }
    });
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eligibilityResult?.eligible) {
      toast.error("You must meet all eligibility criteria to apply.");
      return;
    }

    // Basic validation
    if (!formData.location || !formData.businessInfo.useCase) {
      toast.error("Please fill in all required fields.");
      return;
    }

    applyLoan(formData, {
      onSuccess: () => {
        setActiveTab('history');
        setAppStep('select-product');
        setSelectedProduct(null);
        setEligibilityResult(null);
      }
    });
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'history', label: 'Loan History' },
    { id: 'apply', label: 'Apply for Loan' }
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-[24px] font-bold text-[#101828] leading-tight">Loan Management</h1>
            <p className="text-[13px] text-[#667085] mt-1 font-normal">
              Apply for credits and track your repayment performance
            </p>
          </div>
          {activeTab !== 'apply' && (
            <button 
              onClick={() => setActiveTab('apply')}
              className="bg-[#1d1d2a] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1d1d2a]/90 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <span className="text-lg leading-none">+</span>
              Apply for Loan
            </button>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Wallet}
            title="Current Tier"
            value={member?.subscriptionTierId?.name || "Member"}
            subtitle={`Contribution: ₦${(member?.monthlyContribution || 0).toLocaleString()}`}
            iconColor="#E6007A"
          />
          <StatCard
            icon={CreditCard}
            title="Credit Status"
            value={activeLoan ? "Active Credit" : "No Active Loan"}
            subtitle={activeLoan ? `Remaining: ₦${remaining.toLocaleString()}` : "Ready to apply"}
            iconColor="#E6007A"
          />
          <StatCard
            icon={FileText}
            title="Application Status"
            value={myLoans?.find(l => l.status === 'pending') ? "Pending Review" : "None Pending"}
            subtitle="Recent applications"
            iconColor="#E6007A"
          />
          <StatCard
            icon={TrendingUp}
            title="Repayment Performance"
            value={myLoans?.length ? "Good" : "N/A"}
            subtitle="Based on history"
            iconColor="#E6007A"
          />
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-6 flex overflow-x-auto border-b">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-8 py-4 font-medium transition-all relative ${
                activeTab === tab.id
                  ? 'text-pink-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-pink-600" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {activeLoan ? (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-pink-50">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Active Loan</h2>
                    <p className="text-sm text-gray-500 mt-1">ID: {activeLoan._id.slice(-8).toUpperCase()}</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    {activeLoan.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Repaid: ₦{totalRepaid.toLocaleString()}</span>
                    <span className="text-gray-600">Total: ₦{activeLoan.amount.toLocaleString()}</span>
                  </div>
                  
                  <div className="w-full bg-gray-100 rounded-full h-3">
                    <div 
                      className="bg-pink-600 h-full rounded-full transition-all"
                      style={{ width: `${(totalRepaid / activeLoan.amount) * 100}%` }}
                    />
                  </div>

                  <div className="grid grid-cols-2 pt-4 border-t gap-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Interest Rate</p>
                      <p className="text-lg font-bold text-gray-900">{activeLoan.interestRate}% <span className="text-xs font-normal">p.a</span></p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Monthly Pay</p>
                      <p className="text-lg font-bold text-gray-900">₦{activeLoan.monthlyPayment.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl p-8 shadow-sm border border-dashed flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <CreditCard className="w-8 h-8 text-gray-400" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">No Active Credit</h2>
                <p className="text-gray-500 max-w-xs mt-1">
                  You don't have any active loans. You can apply for a loan based on your contribution tier.
                </p>
                <Button onClick={() => setActiveTab('apply')} className="mt-6 bg-pink-600 hover:bg-pink-700">
                  Browse Loan Products
                </Button>
              </div>
            )}

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Tier & Eligibility</h2>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase">Current Tier</p>
                    <p className="text-lg font-bold text-pink-600">{member?.subscriptionTierId?.name || "Loading..."}</p>
                  </div>
                  <Button variant="outline" size="sm">Upgrade</Button>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 font-bold uppercase mb-2">Membership Stats</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Paid Contributions</span>
                    <span className="font-bold">{(member?.paymentHistory || [])?.filter((p: any) => p.status === 'paid').length || 0} Months</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border">
             <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Description</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Amount</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Term</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {loadingLoans ? (
                    <tr><td colSpan={5} className="p-8 text-center text-gray-400">Loading history...</td></tr>
                  ) : myLoans?.length === 0 ? (
                    <tr><td colSpan={5} className="p-8 text-center text-gray-400">No loan history found.</td></tr>
                  ) : (
                    myLoans?.map((loan) => (
                      <tr key={loan._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-medium text-gray-900">{(loan.loanProductId as any)?.name || "Loan Application"}</p>
                          <p className="text-xs text-gray-500">{loan.purpose}</p>
                        </td>
                        <td className="px-6 py-4 font-bold">₦{loan.amount.toLocaleString()}</td>
                        <td className="px-6 py-4 text-sm">{loan.durationMonths} Months</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            loan.status === 'approved' || loan.status === 'disbursed' ? 'bg-green-100 text-green-700' :
                            loan.status === 'pending' || loan.status === 'under_review' ? 'bg-blue-100 text-blue-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {loan.status.replace('_', ' ').toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {new Date(loan.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
             </div>
          </div>
        )}

        {activeTab === 'apply' && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
              <div className="p-8 border-b">
                <div className="flex items-center gap-4 mb-4">
                  {appStep !== 'select-product' && (
                    <button 
                      onClick={() => setAppStep(appStep === 'form' ? 'check-eligibility' : 'select-product')}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                  )}
                  <h2 className="text-2xl font-bold">Apply for Loan</h2>
                </div>
                
                {/* Progress Mini Bar */}
                <div className="flex gap-2">
                  <div className={`h-1.5 flex-1 rounded-full ${appStep === 'select-product' ? 'bg-pink-600' : 'bg-pink-200'}`} />
                  <div className={`h-1.5 flex-1 rounded-full ${appStep === 'check-eligibility' ? 'bg-pink-600' : 'bg-pink-200'}`} />
                  <div className={`h-1.5 flex-1 rounded-full ${appStep === 'form' ? 'bg-pink-600' : 'bg-pink-200'}`} />
                </div>
              </div>

              <div className="p-8">
                {appStep === 'select-product' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-bold">Select a Loan Product</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {products?.map(product => (
                        <div 
                          key={product._id}
                          onClick={() => handleProductSelect(product)}
                          className="p-6 border rounded-xl hover:border-pink-600 hover:shadow-md cursor-pointer transition-all group"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <span className="px-3 py-1 bg-pink-50 text-pink-600 rounded-lg text-xs font-bold">{product.tier}</span>
                            <span className="text-xl font-bold">₦{product.amount.toLocaleString()}</span>
                          </div>
                          <h4 className="font-bold text-gray-900 group-hover:text-pink-600">{product.name}</h4>
                          <p className="text-sm text-gray-500 mb-4">{product.repaymentTerm} months @ {product.interestRate}%</p>
                          <div className="flex items-center text-pink-600 font-medium text-sm">
                            Select Product <ChevronRight className="w-4 h-4 ml-1" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {appStep === 'check-eligibility' && selectedProduct && (
                  <div className="space-y-8">
                    <div className="bg-pink-50 p-6 rounded-xl border border-pink-100">
                      <p className="text-sm text-pink-600 font-bold uppercase mb-1">Selected Product</p>
                      <div className="flex justify-between items-end">
                        <div>
                          <h4 className="text-xl font-bold">{selectedProduct.name}</h4>
                          <p className="text-gray-600">₦{selectedProduct.amount.toLocaleString()} for {selectedProduct.repaymentTerm} months</p>
                        </div>
                        <p className="text-lg font-bold">₦{selectedProduct.monthlyPayment.toLocaleString()}/mo</p>
                      </div>
                    </div>

                    {!eligibilityResult ? (
                      <div className="text-center py-12">
                        <Button 
                          onClick={runEligibilityCheck} 
                          disabled={checkingEligibility}
                          className="bg-pink-600 h-14 px-12 rounded-full text-lg shadow-lg hover:shadow-xl transition-all"
                        >
                          {checkingEligibility ? <><Loader2 className="mr-2 animate-spin" /> Assessing...</> : "Run Eligibility Check"}
                        </Button>
                        <p className="text-gray-500 mt-4 text-sm">This will analyze your data against 6 criteria</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className={`p-4 rounded-xl flex items-center gap-4 ${eligibilityResult.eligible ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                          {eligibilityResult.eligible ? <Check className="text-green-600" /> : <AlertCircle className="text-red-600" />}
                          <div>
                            <p className="font-bold">{eligibilityResult.eligible ? "Eligible to Proceed" : "Not Eligible"}</p>
                            <p className="text-sm">{eligibilityResult.eligible ? "You meet all mandatory criteria for this loan product." : "One or more mandatory checks failed."}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                          {eligibilityResult.checks.map(check => (
                            <div key={check.id} className="flex items-center justify-between p-4 border rounded-lg">
                              <div className="flex items-center gap-3">
                                {check.passed ? <Check className="w-5 h-5 text-green-600" /> : <Loader2 className="w-5 h-5 text-gray-300" />}
                                <div>
                                  <p className="text-sm font-bold">{check.title}</p>
                                  <p className="text-xs text-gray-500">{check.message}</p>
                                </div>
                              </div>
                              <span className={`text-xs font-bold ${check.passed ? 'text-green-600' : 'text-red-600'}`}>
                                {check.passed ? "PASSED" : "FAILED"}
                              </span>
                            </div>
                          ))}
                        </div>

                        {eligibilityResult.eligible && (
                          <Button onClick={() => setAppStep('form')} className="w-full h-12 bg-pink-600">
                            Continue to Application Form
                          </Button>
                        )}
                        {!eligibilityResult.eligible && (
                          <Button onClick={() => setAppStep('select-product')} variant="outline" className="w-full h-12">
                            Select a Different Product
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {appStep === 'form' && selectedProduct && (
                  <form onSubmit={handleApply} className="space-y-8">
                    <section>
                      <h4 className="text-lg font-bold mb-4">Business Information</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-bold text-gray-700 mb-1 block">Your Current Location</label>
                          <Input 
                            required
                            placeholder="City, State"
                            value={formData.location}
                            onChange={e => setFormData({...formData, location: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-bold text-gray-700 mb-1 block">What do you intend to use the loan for?</label>
                          <Textarea 
                            required
                            placeholder="Describe your intended use case..."
                            value={formData.businessInfo.useCase}
                            onChange={e => setFormData({
                              ...formData, 
                              businessInfo: { ...formData.businessInfo, useCase: e.target.value } 
                            })}
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-bold text-gray-700 mb-1 block">Impact on Business</label>
                            <Input 
                              required
                              placeholder="e.g. increase stock by 50%"
                              value={formData.businessInfo.businessImpact}
                              onChange={e => setFormData({
                                ...formData, 
                                businessInfo: { ...formData.businessInfo, businessImpact: e.target.value } 
                              })}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-bold text-gray-700 mb-1 block">Expected Sales Growth (%)</label>
                            <Input 
                              required
                              type="number"
                              placeholder="e.g. 20"
                              value={formData.businessInfo.expectedSalesImpact}
                              onChange={e => setFormData({
                                ...formData, 
                                businessInfo: { ...formData.businessInfo, expectedSalesImpact: e.target.value } 
                              })}
                            />
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Guarantor Section - Only if needed or always available */}
                    <section className="bg-gray-50 p-6 rounded-xl">
                      <div className="flex items-center gap-2 mb-4">
                        <Check className="text-pink-600 w-5 h-5" />
                        <h4 className="text-lg font-bold">Guarantor Information</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-6 italic">A guarantor is required for loans exceeding your tier limit of ₦{eligibilityResult?.tierLimit.toLocaleString()}.</p>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-bold text-gray-700 mb-1 block">Full Name</label>
                          <Input 
                            placeholder="Guarantor's full name"
                            value={formData.guarantor?.fullName}
                            onChange={e => setFormData({
                              ...formData, 
                              guarantor: { ...formData.guarantor!, fullName: e.target.value } 
                            })}
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-bold text-gray-700 mb-1 block">Relationship</label>
                            <Input 
                              placeholder="e.g. Business Partner"
                              value={formData.guarantor?.relationship}
                              onChange={e => setFormData({
                                ...formData, 
                                guarantor: { ...formData.guarantor!, relationship: e.target.value } 
                              })}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-bold text-gray-700 mb-1 block">Member ID</label>
                            <Input 
                              placeholder="DAW Member ID"
                              value={formData.guarantor?.memberId}
                              onChange={e => setFormData({
                                ...formData, 
                                guarantor: { ...formData.guarantor!, memberId: e.target.value } 
                              })}
                            />
                          </div>
                        </div>
                      </div>
                    </section>

                    <Button 
                      type="submit" 
                      disabled={applyingLoan}
                      className="w-full h-14 bg-pink-600 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
                    >
                      {applyingLoan ? <><Loader2 className="mr-2 animate-spin" /> Submitting Application...</> : "Submit Final Application"}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoanManagement;