import React, { useState, Component } from 'react';
import {
  SmartphoneSimulator,
  ScreenState } from
'./components/SmartphoneSimulator';
export function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('home');
  const screenOptions: {
    value: ScreenState;
    label: string;
  }[] = [
  {
    value: 'home',
    label: 'Home Screen'
  },
  {
    value: 'settings',
    label: 'Settings Menu'
  },
  {
    value: 'wifi_off',
    label: 'Wi-Fi (Off)'
  },
  {
    value: 'wifi_on',
    label: 'Wi-Fi (On)'
  },
  {
    value: 'files',
    label: 'Files App'
  },
  {
    value: 'document',
    label: 'Document View'
  },
  {
    value: 'contacts',
    label: 'Contacts List'
  },
  {
    value: 'contact_card',
    label: 'Contact Card'
  },
  {
    value: 'video_call',
    label: 'Video Call'
  },
  {
    value: 'inbox',
    label: 'Mail Inbox'
  },
  {
    value: 'scam_email',
    label: 'Scam Email'
  },
  {
    value: 'real_email',
    label: 'Real Email'
  },
  {
    value: 'health_chat',
    label: 'Health AI Chat'
  }];

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen bg-slate-100">
      {/* Left side: Controls (Simulating the other half of a split screen) */}
      <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-slate-200 bg-white">
        <div className="max-w-md mx-auto w-full">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Smartphone Simulator
          </h1>
          <p className="text-lg text-slate-600 mb-8">
            Select a screen state below to update the phone UI. The phone is
            designed with senior accessibility in mind: large text, high
            contrast, and clear touch targets.
          </p>

          <div className="space-y-2">
            <label
              htmlFor="screen-select"
              className="block text-sm font-medium text-slate-700">
              
              Current Screen State
            </label>
            <select
              id="screen-select"
              value={currentScreen}
              onChange={(e) => setCurrentScreen(e.target.value as ScreenState)}
              className="w-full p-4 text-lg bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all">
              
              {screenOptions.map((option) =>
              <option key={option.value} value={option.value}>
                  {option.label} ({option.value})
                </option>
              )}
            </select>
          </div>

          <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-100">
            <h3 className="font-semibold text-blue-900 mb-2">
              Interactive Demo
            </h3>
            <p className="text-blue-800">
              You can also interact directly with the phone! Try clicking the
              app icons on the home screen, or the back buttons in the apps.
            </p>
          </div>
        </div>
      </div>

      {/* Right side: The Phone Component */}
      <div className="flex-1 p-8 flex items-center justify-center bg-slate-100 overflow-hidden">
        <div className="scale-[0.85] sm:scale-90 md:scale-100 origin-center transition-transform">
          <SmartphoneSimulator
            screenState={currentScreen}
            onStateChange={setCurrentScreen} />
          
        </div>
      </div>
    </div>);

}