import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Shield, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { 
  calculatePasswordStrength, 
  generateFeedback, 
  strengthLabels, 
  strengthColors,
  StrengthLevel
} from '../utils/passwordStrength';

const PasswordStrengthChecker: React.FC = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState<StrengthLevel>(StrengthLevel.VERY_WEAK);
  const [feedback, setFeedback] = useState<string[]>([]);
  
  useEffect(() => {
    const strengthLevel = calculatePasswordStrength(password);
    setStrength(strengthLevel);
    setFeedback(generateFeedback(password));
  }, [password]);
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center mb-4">
        <Shield className="h-6 w-6 text-blue-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-800">Password Strength Checker</h2>
      </div>
      
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Enter Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your password"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>
      
      {/* Strength meter */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-700">Strength:</span>
          <span className={`text-sm font-medium ${strengthLabels[strength].color}`}>
            {strengthLabels[strength].text}
          </span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full ${strengthColors[strength]} transition-all duration-300 ease-in-out`}
            style={{ width: `${(strength + 1) * 20}%` }}
          ></div>
        </div>
      </div>
      
      {/* Feedback section */}
      {password && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Recommendations:</h3>
          {feedback.length > 0 ? (
            <ul className="space-y-1">
              {feedback.map((item, index) => (
                <li key={index} className="flex items-start">
                  <AlertTriangle size={16} className="text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex items-center text-green-600">
              <CheckCircle2 size={16} className="mr-2" />
              <span className="text-sm">Great password! No improvements needed.</span>
            </div>
          )}
        </div>
      )}
      
      {/* Password tips */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Tips for a strong password:</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Use at least 12 characters</li>
          <li>• Mix uppercase and lowercase letters</li>
          <li>• Include numbers and special characters</li>
          <li>• Avoid common words or patterns</li>
          <li>• Don't use personal information</li>
        </ul>
      </div>
    </div>
  );
};

export default PasswordStrengthChecker;