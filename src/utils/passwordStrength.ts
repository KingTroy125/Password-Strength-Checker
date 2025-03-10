/**
 * Password strength evaluation utility
 * Analyzes password security based on multiple factors
 */

// Password strength levels
export enum StrengthLevel {
  VERY_WEAK = 0,
  WEAK = 1,
  MEDIUM = 2,
  STRONG = 3,
  VERY_STRONG = 4
}

// Strength level labels and colors
export const strengthLabels = [
  { text: 'Very Weak', color: 'text-red-600' },
  { text: 'Weak', color: 'text-orange-500' },
  { text: 'Medium', color: 'text-yellow-500' },
  { text: 'Strong', color: 'text-green-500' },
  { text: 'Very Strong', color: 'text-emerald-600' }
];

// Progress bar colors for each strength level
export const strengthColors = [
  'bg-red-600',
  'bg-orange-500',
  'bg-yellow-500',
  'bg-green-500',
  'bg-emerald-600'
];

// Common password patterns to check against
const commonPatterns = [
  'password',
  '123456',
  'qwerty',
  'admin',
  'welcome',
  'letmein',
  'abc123',
  '111111',
  '12345678',
  'iloveyou'
];

// Common sequences to check against
const sequences = [
  'abcdefghijklmnopqrstuvwxyz',
  'qwertyuiop',
  'asdfghjkl',
  'zxcvbnm',
  '01234567890'
];

/**
 * Check if password contains a common sequence
 */
const containsSequence = (password: string): boolean => {
  const lowerPassword = password.toLowerCase();
  
  for (const sequence of sequences) {
    for (let i = 0; i < sequence.length - 2; i++) {
      const seq = sequence.substring(i, i + 3);
      if (lowerPassword.includes(seq)) {
        return true;
      }
    }
  }
  
  return false;
};

/**
 * Check if password is a common password
 */
const isCommonPassword = (password: string): boolean => {
  const lowerPassword = password.toLowerCase();
  return commonPatterns.some(pattern => lowerPassword.includes(pattern));
};

/**
 * Check if password has repeated characters
 */
const hasRepeatedChars = (password: string): boolean => {
  return /(.)\1{2,}/.test(password);
};

/**
 * Calculate password strength score
 */
export const calculatePasswordStrength = (password: string): StrengthLevel => {
  if (!password) return StrengthLevel.VERY_WEAK;
  
  let score = 0;
  
  // Length check
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  
  // Character variety checks
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^a-zA-Z0-9]/.test(password)) score += 1;
  
  // Penalty for common patterns
  if (isCommonPassword(password)) score -= 2;
  
  // Penalty for sequences
  if (containsSequence(password)) score -= 1;
  
  // Penalty for repeated characters
  if (hasRepeatedChars(password)) score -= 1;
  
  // Ensure score is within bounds
  score = Math.max(0, score);
  
  // Map score to strength level
  if (score <= 1) return StrengthLevel.VERY_WEAK;
  if (score <= 3) return StrengthLevel.WEAK;
  if (score <= 5) return StrengthLevel.MEDIUM;
  if (score <= 7) return StrengthLevel.STRONG;
  return StrengthLevel.VERY_STRONG;
};

/**
 * Generate feedback based on password analysis
 */
export const generateFeedback = (password: string): string[] => {
  const feedback: string[] = [];
  
  if (!password || password.length < 8) {
    feedback.push('Use at least 8 characters');
  }
  
  if (password && !/[a-z]/.test(password)) {
    feedback.push('Include lowercase letters');
  }
  
  if (password && !/[A-Z]/.test(password)) {
    feedback.push('Include uppercase letters');
  }
  
  if (password && !/[0-9]/.test(password)) {
    feedback.push('Include numbers');
  }
  
  if (password && !/[^a-zA-Z0-9]/.test(password)) {
    feedback.push('Include special characters');
  }
  
  if (password && isCommonPassword(password)) {
    feedback.push('Avoid common passwords and patterns');
  }
  
  if (password && containsSequence(password)) {
    feedback.push('Avoid sequential characters (abc, 123)');
  }
  
  if (password && hasRepeatedChars(password)) {
    feedback.push('Avoid repeated characters');
  }
  
  return feedback;
};