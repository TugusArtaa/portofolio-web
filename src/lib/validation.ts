export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | null;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateField(
  value: string,
  rules: ValidationRule
): string | null {
  // Required validation
  if (rules.required && (!value || value.trim() === "")) {
    return "Field ini wajib diisi";
  }

  // Skip other validations if field is empty and not required
  if (!value || value.trim() === "") {
    return null;
  }

  // Min length validation
  if (rules.minLength && value.length < rules.minLength) {
    return `Minimal ${rules.minLength} karakter`;
  }

  // Max length validation
  if (rules.maxLength && value.length > rules.maxLength) {
    return `Maksimal ${rules.maxLength} karakter`;
  }

  // Pattern validation
  if (rules.pattern && !rules.pattern.test(value)) {
    return "Format tidak valid";
  }

  // Custom validation
  if (rules.custom) {
    return rules.custom(value);
  }

  return null;
}

export function validateForm(
  formData: Record<string, string>,
  validationRules: Record<string, ValidationRule>
): ValidationResult {
  const errors: Record<string, string> = {};

  Object.keys(validationRules).forEach((fieldName) => {
    const value = formData[fieldName] || "";
    const rules = validationRules[fieldName];
    const error = validateField(value, rules);

    if (error) {
      errors[fieldName] = error;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

// Project form validation rules
export const projectValidationRules: Record<string, ValidationRule> = {
  title: {
    required: true,
    minLength: 3,
    maxLength: 100,
  },
  slug: {
    required: true,
    minLength: 3,
    maxLength: 50,
    pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    custom: (value: string) => {
      if (value.startsWith("-") || value.endsWith("-")) {
        return "Slug tidak boleh diawali atau diakhiri dengan tanda '-'";
      }
      return null;
    },
  },
  description: {
    required: true,
    minLength: 10,
    maxLength: 1000,
  },
  techStack: {
    required: true,
    custom: (value: string) => {
      const techs = value
        .split(",")
        .map((tech) => tech.trim())
        .filter(Boolean);
      if (techs.length === 0) {
        return "Minimal satu teknologi harus diisi";
      }
      if (techs.length > 20) {
        return "Maksimal 20 teknologi";
      }
      if (techs.some((tech) => tech.length < 2)) {
        return "Setiap teknologi minimal 2 karakter";
      }
      return null;
    },
  },
  coverImage: {
    required: true,
    custom: (value: string) => {
      if (!value) return "Cover image wajib diisi";

      // Check if it's a local upload path
      if (
        value.startsWith("/uploads/") ||
        value.startsWith("./uploads/") ||
        value.startsWith("../uploads/")
      ) {
        // Validate file extension for local uploads
        const validExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
        const hasValidExtension = validExtensions.some((ext) =>
          value.toLowerCase().endsWith(ext)
        );

        if (!hasValidExtension) {
          return "File harus berformat gambar (jpg, jpeg, png, gif, webp)";
        }

        return null;
      }

      // Validate URL format for external URLs
      try {
        const url = new URL(value);

        // Check if protocol is valid
        if (!["http:", "https:"].includes(url.protocol)) {
          return "URL harus menggunakan protocol http atau https";
        }
      } catch {
        return "URL gambar tidak valid";
      }

      // Check for common image extensions in URL
      const validExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
      const hasValidExtension = validExtensions.some((ext) =>
        value.toLowerCase().includes(ext)
      );

      if (!hasValidExtension) {
        return "URL harus mengarah ke file gambar (jpg, jpeg, png, gif, webp)";
      }

      return null;
    },
  },
  url: {
    required: false,
    custom: (value: string) => {
      if (!value) return null;

      try {
        const url = new URL(value);
        if (!["http:", "https:"].includes(url.protocol)) {
          return "URL harus menggunakan protocol http atau https";
        }
      } catch {
        return "Format URL tidak valid";
      }

      return null;
    },
  },
};
