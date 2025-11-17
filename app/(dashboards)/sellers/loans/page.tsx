
"use client";

import React, { useState } from 'react';
import { Wallet, CreditCard, FileText, TrendingUp, Check, ChevronRight } from 'lucide-react';

// Types
interface LoanData {
  currentTier: string;
  contribution: number;
  availableCredit: number;
  activeLoans: number;
  remainingAmount: number;
  interestRate: number;
}

interface LoanStatus {
  id: string;
  status: 'active' | 'completed';
  repaid: number;
  remaining: number;
  originalAmount: number;
  dueDate: string;
  purpose?: string;
}

interface ContributionTier {
  name: string;
  description: string;
  price: number;
  isCurrent?: boolean;
  features: string[];
}

interface EligibilityCriteria {
  title: string;
  description: string;
  status: 'passed' | 'advisory' | 'failed';
}

const LoanManagement = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'tiers' | 'history' | 'apply'>('overview');

  // Mock data
  const loanData: LoanData = {
    currentTier: 'Silver',
    contribution: 35000,
    availableCredit: 75000,
    activeLoans: 1,
    remainingAmount: 5000,
    interestRate: 6
  };

  const currentLoan: LoanStatus = {
    id: 'LN-001',
    status: 'active',
    repaid: 45000,
    remaining: 5000,
    originalAmount: 50000,
    dueDate: 'July 15, 2024',
    purpose: 'Inventory Purchase'
  };

  const loanHistory: LoanStatus[] = [
    {
      id: 'LN-001',
      status: 'active',
      repaid: 45000,
      remaining: 5000,
      originalAmount: 50000,
      dueDate: 'July 15, 2024',
      purpose: 'Inventory Purchase'
    },
    {
      id: 'LN-001',
      status: 'active',
      repaid: 45000,
      remaining: 5000,
      originalAmount: 50000,
      dueDate: 'July 15, 2024',
      purpose: 'Inventory Purchase'
    }
  ];

  const tiers: ContributionTier[] = [
    {
      name: 'Basic',
      description: 'Community access with basic features',
      price: 5,
      features: [
        'Community forum access',
        'Basic support',
        'Digital marketplace browsing'
      ]
    },
    {
      name: 'Standard',
      description: 'Enhanced access with moderate benefits',
      price: 25,
      isCurrent: true,
      features: [
        '5% transaction fee discount',
        'Access to standard masterclasses',
        'Priority support',
        'All Basic features',
        'Up to 10 product listing'
      ]
    },
    {
      name: 'Basic',
      description: 'Community access with basic features',
      price: 60,
      features: [
        'Preferred loan consideration',
        '15% transaction fee discount',
        'Access to all masterclasses',
        'Dedicated agent support',
        'All Standard features',
        'Unlimited product listings'
      ]
    },
    {
      name: 'Basic',
      description: 'Community access with basic features',
      price: 120,
      features: [
        'Featured store placement',
        '25% transaction fee discount',
        'All Premium features',
        'Business growth consulting',
        'Export assistance'
      ]
    }
  ];

  const eligibilityCriteria: EligibilityCriteria[] = [
    {
      title: 'Active Cooperative Member',
      description: 'Member for 6+ months',
      status: 'passed'
    },
    {
      title: 'Minimum Contribution',
      description: '₦35,000 contributed (Silver tier)',
      status: 'passed'
    },
    {
      title: 'No Active Default',
      description: 'Clean repayment history',
      status: 'passed'
    },
    {
      title: 'Business Registration',
      description: 'CAC registration recommended',
      status: 'advisory'
    }
  ];

  const nextTier = {
    name: 'Gold',
    additionalRequired: 15000
  };

  const getProgressPercentage = () => {
    return (currentLoan.repaid / currentLoan.originalAmount) * 100;
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'tiers', label: 'Contribution Tiers' },
    { id: 'history', label: 'Loan History' },
    { id: 'apply', label: 'Apply for Loan' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Loan Management</h1>
            <p className="text-sm md:text-base text-gray-600 mt-1">
              Manage loan applications, approvals, and track repayments
            </p>
          </div>
          <button className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto">
            <span className="text-lg">+</span>
            Apply for Loan
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                <Wallet className="w-5 h-5 text-pink-600" />
              </div>
              <span className="text-sm text-gray-600">Current Tier</span>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{loanData.currentTier}</div>
            <div className="text-sm text-gray-500">Contribution: ₦{loanData.contribution.toLocaleString()}</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-pink-600" />
              </div>
              <span className="text-sm text-gray-600">Available Credit</span>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">₦{loanData.availableCredit.toLocaleString()}</div>
            <div className="text-sm text-gray-500">Max loan amount</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-pink-600" />
              </div>
              <span className="text-sm text-gray-600">Active Loans</span>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{loanData.activeLoans}</div>
            <div className="text-sm text-gray-500">₦{loanData.remainingAmount.toLocaleString()} remaining</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-pink-600" />
              </div>
              <span className="text-sm text-gray-600">Interest Rate</span>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{loanData.interestRate}%</div>
            <div className="text-sm text-gray-500">Annual percentage</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-6 overflow-x-auto">
          <div className="flex min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'overview' | 'tiers' | 'history' | 'apply')}
                className={`flex-1 px-6 py-4 font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-white bg-pink-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Current Loan Status */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Current Loan Status</h2>
                  <p className="text-sm text-gray-500 mt-1">Loan ID: {currentLoan.id}</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Active
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Repaid: ₦{currentLoan.repaid.toLocaleString()}</span>
                  <span className="text-gray-600">Remaining: ₦{currentLoan.remaining.toLocaleString()}</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-pink-500 to-pink-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${getProgressPercentage()}%` }}
                  />
                </div>

                <div className="flex justify-between pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-sm text-gray-500">Original Amount</p>
                    <p className="text-lg font-bold text-gray-900">₦{currentLoan.originalAmount.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Due Date</p>
                    <p className="text-lg font-bold text-gray-900">{currentLoan.dueDate}</p>
                  </div>
                </div>

                <button className="w-full bg-pink-600 text-white py-3 rounded-lg font-medium hover:bg-pink-700 transition-colors">
                  Save
                </button>
              </div>
            </div>

            {/* Contribution Summary */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Contribution Summary</h2>
              
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-gray-900 mb-2">₦{loanData.contribution.toLocaleString()}</div>
                <p className="text-gray-600">Total Contributions</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Current Tier: {loanData.currentTier}</span>
                  <span className="font-medium text-gray-900">₦{loanData.contribution.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Next Tier: {nextTier.name}</span>
                  <span className="font-medium text-gray-900">₦{nextTier.additionalRequired.toLocaleString()} more</span>
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden mb-6">
                <div 
                  className="bg-gradient-to-r from-pink-500 to-pink-600 h-full rounded-full"
                  style={{ width: `${(loanData.contribution / (loanData.contribution + nextTier.additionalRequired)) * 100}%` }}
                />
              </div>

              <button className="w-full bg-gray-100 text-gray-900 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                Add Contribution
              </button>
            </div>
          </div>
        )}

        {activeTab === 'tiers' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tiers.map((tier, index) => (
                <div
                  key={index}
                  className={`rounded-xl p-6 ${
                    tier.isCurrent
                      ? 'bg-gradient-to-br from-pink-600 to-pink-700 text-white shadow-xl scale-105'
                      : 'bg-white text-gray-900 shadow-sm'
                  } transition-transform hover:scale-105`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-lg font-bold ${tier.isCurrent ? 'text-white' : 'text-gray-900'}`}>
                      {tier.name}
                    </h3>
                    {tier.isCurrent && (
                      <span className="px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-bold">
                        CURRENT
                      </span>
                    )}
                  </div>
                  
                  <p className={`text-sm mb-6 ${tier.isCurrent ? 'text-pink-100' : 'text-gray-600'}`}>
                    {tier.description}
                  </p>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold">${tier.price.toFixed(2)}</span>
                      <span className={`text-sm ${tier.isCurrent ? 'text-pink-200' : 'text-gray-500'}`}>/month</span>
                    </div>
                  </div>

                  <button
                    className={`w-full py-3 rounded-lg font-medium transition-colors mb-6 ${
                      tier.isCurrent
                        ? 'bg-white/20 text-white hover:bg-white/30'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}
                  >
                    {tier.isCurrent ? 'Select' : index > 1 ? 'Upgrade' : 'Select'}
                  </button>

                  <div>
                    <p className={`text-xs font-bold mb-3 ${tier.isCurrent ? 'text-pink-200' : 'text-pink-600'}`}>
                      PLAN INCLUDES:
                    </p>
                    <ul className="space-y-2">
                      {tier.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${tier.isCurrent ? 'text-white' : 'text-green-600'}`} />
                          <span className={tier.isCurrent ? 'text-pink-100' : 'text-gray-700'}>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Loan History</h2>
            </div>
            
            <div className="divide-y divide-gray-100">
              {loanHistory.map((loan, index) => (
                <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="font-bold text-gray-900">{loan.id}</h3>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          Active
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{loan.purpose}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-sm mb-3">
                    <span className="text-gray-600">Repaid: ₦{loan.repaid.toLocaleString()}</span>
                    <span className="text-gray-600">Remaining: ₦{loan.remaining.toLocaleString()}</span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden mb-4">
                    <div 
                      className="bg-gradient-to-r from-pink-500 to-pink-600 h-full rounded-full"
                      style={{ width: `${(loan.repaid / loan.originalAmount) * 100}%` }}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">Original Amount</span>
                      <p className="font-bold text-gray-900">₦{loan.originalAmount.toLocaleString()}</p>
                    </div>
                    <div className="text-left sm:text-right">
                      <span className="text-gray-500">Due Date</span>
                      <p className="font-bold text-gray-900">{loan.dueDate}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'apply' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm">
              <div className="mb-8">
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-pink-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Loan Eligibility Assessment</h2>
                <p className="text-gray-600">Based on your profile and contribution history</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="text-center p-6 bg-pink-50 rounded-xl">
                  <div className="text-5xl font-bold text-pink-600 mb-2">85%</div>
                  <p className="text-gray-600 font-medium">ELIGIBILITY SCORE</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                    <div className="bg-gradient-to-r from-pink-500 to-pink-600 h-full rounded-full" style={{ width: '85%' }} />
                  </div>
                </div>

                <div className="text-center p-6 bg-pink-50 rounded-xl">
                  <div className="text-5xl font-bold text-gray-900 mb-2">$75.00</div>
                  <p className="text-gray-600 font-medium">MAXIMUM LOAN</p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Eligibility Criteria</h3>
                <div className="space-y-3">
                  {eligibilityCriteria.map((criteria, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 hover:border-pink-200 transition-colors"
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        criteria.status === 'passed'
                          ? 'bg-pink-100'
                          : criteria.status === 'advisory'
                          ? 'bg-gray-100'
                          : 'bg-red-100'
                      }`}>
                        <Check className={`w-5 h-5 ${
                          criteria.status === 'passed'
                            ? 'text-pink-600'
                            : criteria.status === 'advisory'
                            ? 'text-gray-600'
                            : 'text-red-600'
                        }`} />
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-1">{criteria.title}</h4>
                        <p className="text-sm text-gray-600">{criteria.description}</p>
                      </div>

                      <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                        criteria.status === 'passed'
                          ? 'bg-pink-100 text-pink-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {criteria.status === 'passed' ? 'Passed' : 'Advisory'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-bold text-gray-900 mb-3">Improve Your Profile</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-0.5 text-pink-600 flex-shrink-0" />
                    <span>Complete business registration to access higher loan amounts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-0.5 text-pink-600 flex-shrink-0" />
                    <span>Increase contributions to unlock Gold tier benefits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-0.5 text-pink-600 flex-shrink-0" />
                    <span>Maintain consistent repayment history</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoanManagement;