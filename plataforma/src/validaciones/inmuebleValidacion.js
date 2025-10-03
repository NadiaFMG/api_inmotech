// Validaciones para campos requeridos y tipos de datos
export const validationRules = {
  // Inmueble principal
  inmueble: {
    Valor: {
      required: true,
      type: 'number',
      min: 1,
      message: 'El valor debe ser un número mayor a 0'
    },
    Area: {
      required: true,
      type: 'number',
      min: 1,
      message: 'El área debe ser un número mayor a 0'
    },
    Descripcion_General: {
      required: true,
      type: 'string',
      maxLength: 255,
      message: 'La descripción general es requerida (máx. 255 caracteres)'
    },
    Antiguedad: {
      required: true,
      type: 'number',
      min: 0,
      max: 200,
      message: 'La antigüedad debe ser un número entre 0 y 200 años'
    },
    Motivo_VoA: {
      required: true,
      type: 'string',
      maxLength: 100,
      message: 'El motivo de venta/arriendo es requerido (máx. 100 caracteres)'
    },
    Situacion_inmueble: {
      required: true,
      type: 'string',
      maxLength: 50,
      message: 'La situación del inmueble es requerida (máx. 50 caracteres)'
    },
    Codigo_interno: {
      required: true,
      type: 'string',
      maxLength: 30,
      message: 'El código interno es requerido (máx. 30 caracteres)'
    },
    Estado: {
      required: true,
      type: 'string',
      maxLength: 20,
      enum: ['disponible', 'vendido', 'arrendado', 'reservado'],
      message: 'El estado debe ser: disponible, vendido, arrendado o reservado'
    },
    Observaciones: {
      required: false,
      type: 'string',
      maxLength: 255,
      message: 'Las observaciones no pueden exceder 255 caracteres'
    }
  },

  // Dirección
  direccion: {
    Direccion: {
      required: true,
      type: 'string',
      maxLength: 255,
      message: 'La dirección es requerida (máx. 255 caracteres)'
    },
    Tipo_via: {
      required: true,
      type: 'string',
      maxLength: 255,
      enum: ['Calle', 'Carrera', 'Avenida', 'Diagonal', 'Transversal', 'Circular'],
      message: 'El tipo de vía es requerido'
    },
    Numero_via_principal: {
      required: true,
      type: 'number',
      min: 1,
      message: 'El número de vía principal es requerido'
    },
    Numero_calle_transversal: {
      required: true,
      type: 'number',
      min: 1,
      message: 'El número de calle transversal es requerido'
    },
    Numero_edificacion: {
      required: true,
      type: 'number',
      min: 1,
      message: 'El número de edificación es requerido'
    },
    Descripcion_adicional: {
      required: true,
      type: 'string',
      maxLength: 50,
      message: 'La descripción adicional es requerida (máx. 50 caracteres)'
    }
  },

  // Localización
  localizacion: {
    Localizacion_descripcion: {
      required: true,
      type: 'string',
      maxLength: 100,
      message: 'La descripción de localización es requerida (máx. 100 caracteres)'
    },
    Latitud: {
      required: true,
      type: 'number',
      min: -90,
      max: 90,
      message: 'La latitud debe estar entre -90 y 90'
    },
    Longitud: {
      required: true,
      type: 'number',
      min: -180,
      max: 180,
      message: 'La longitud debe estar entre -180 y 180'
    }
  },

  // División
  division: {
    Division: {
      required: true,
      type: 'string',
      maxLength: 50,
      enum: ['Apartamento', 'Casa', 'Local', 'Oficina', 'Bodega', 'Lote'],
      message: 'El tipo de división es requerido'
    },
    Balcon: {
      required: true,
      type: 'string',
      maxLength: 2,
      enum: ['Si', 'No'],
      message: 'Especifique si tiene balcón (Si/No)'
    },
    Baños: {
      required: true,
      type: 'number',
      min: 1,
      max: 20,
      message: 'El número de baños debe estar entre 1 y 20'
    },
    Terraza: {
      required: true,
      type: 'number',
      min: 0,
      max: 10,
      message: 'El número de terrazas debe estar entre 0 y 10'
    },
    Habitaciones: {
      required: true,
      type: 'number',
      min: 1,
      max: 20,
      message: 'El número de habitaciones debe estar entre 1 y 20'
    },
    Garaje: {
      required: true,
      type: 'number',
      min: 0,
      max: 10,
      message: 'El número de garajes debe estar entre 0 y 10'
    },
    Ascensores: {
      required: true,
      type: 'string',
      maxLength: 2,
      enum: ['Si', 'No'],
      message: 'Especifique si tiene ascensores (Si/No)'
    },
    Area: {
      required: true,
      type: 'string',
      maxLength: 10,
      message: 'El área es requerida'
    }
  },

  // Acerca de la edificación
  acerca_edificacion: {
    AcercaDeLaEdificacion: {
      required: true,
      type: 'string',
      maxLength: 100,
      message: 'La descripción de la edificación es requerida (máx. 100 caracteres)'
    },
    Estrato: {
      required: true,
      type: 'number',
      min: 1,
      max: 6,
      message: 'El estrato debe estar entre 1 y 6'
    }
  },

  // Tipo de edificación
  tipo_edificacion: {
    Tipo_edificacion_descripcion: {
      required: true,
      type: 'string',
      maxLength: 50,
      message: 'La descripción del tipo de edificación es requerida (máx. 50 caracteres)'
    }
  },

  // Otras características
  otras_caracteristicas: {
    Caracteristicas_descripcion: {
      required: true,
      type: 'string',
      maxLength: 30,
      message: 'La descripción de características es requerida (máx. 30 caracteres)'
    },
    Deposito: {
      required: true,
      type: 'number',
      min: 0,
      max: 10,
      message: 'El número de depósitos debe estar entre 0 y 10'
    },
    Tipo_inmueble: {
      required: true,
      type: 'string',
      maxLength: 30,
      enum: ['Apartamento', 'Casa', 'Local', 'Oficina', 'Bodega', 'Lote', 'Finca'],
      message: 'El tipo de inmueble es requerido'
    }
  },

  // Organización parqueadero
  organizacion_parqueadero: {
    Tipo_parqueadero: {
      required: true,
      type: 'string',
      maxLength: 30,
      enum: ['Cubierto', 'Descubierto', 'Subterráneo', 'Al aire libre'],
      message: 'El tipo de parqueadero es requerido'
    },
    Cantidad: {
      required: true,
      type: 'number',
      min: 0,
      max: 1000,
      message: 'La cantidad debe estar entre 0 y 1000'
    }
  },

  // Campos opcionales
  ndap: {
    Ndap_descripcion: {
      required: false,
      type: 'string',
      maxLength: 50,
      message: 'La descripción NDAP no puede exceder 50 caracteres'
    }
  },

  municipio: {
    Municipio_nombre: {
      required: false,
      type: 'string',
      maxLength: 255,
      message: 'El nombre del municipio no puede exceder 255 caracteres'
    }
  },

  barrio: {
    Nombre_barrio: {
      required: false,
      type: 'string',
      maxLength: 100,
      message: 'El nombre del barrio no puede exceder 100 caracteres'
    }
  },

  ciudad: {
    Ciudad: {
      required: false,
      type: 'string',
      maxLength: 50,
      message: 'El nombre de la ciudad no puede exceder 50 caracteres'
    }
  },

  corregimiento: {
    Corregimiento: {
      required: false,
      type: 'string',
      maxLength: 50,
      message: 'El nombre del corregimiento no puede exceder 50 caracteres'
    }
  },

  vereda: {
    Vereda_nombre: {
      required: false,
      type: 'string',
      maxLength: 50,
      message: 'El nombre de la vereda no puede exceder 50 caracteres'
    }
  },

  designador_cardinal: {
    Cardinalidad: {
      required: false,
      type: 'string',
      maxLength: 10,
      enum: ['Norte', 'Sur', 'Este', 'Oeste', 'Noreste', 'Noroeste', 'Sureste', 'Suroeste'],
      message: 'La cardinalidad debe ser un punto cardinal válido'
    }
  }
};

// Función para validar un campo específico
export const validateField = (section, field, value) => {
  const rule = validationRules[section]?.[field];
  if (!rule) return { isValid: true };

  const errors = [];

  // Validar campo requerido
  if (rule.required && (!value || value.toString().trim() === '')) {
    errors.push(rule.message || `${field} es requerido`);
    return { isValid: false, errors };
  }

  // Si el campo no es requerido y está vacío, es válido
  if (!rule.required && (!value || value.toString().trim() === '')) {
    return { isValid: true };
  }

  // Validar tipo
  if (rule.type === 'number') {
    const num = Number(value);
    if (isNaN(num)) {
      errors.push(`${field} debe ser un número`);
    } else {
      if (rule.min !== undefined && num < rule.min) {
        errors.push(`${field} debe ser mayor o igual a ${rule.min}`);
      }
      if (rule.max !== undefined && num > rule.max) {
        errors.push(`${field} debe ser menor o igual a ${rule.max}`);
      }
    }
  }

  // Validar longitud de string
  if (rule.type === 'string' && rule.maxLength && value.length > rule.maxLength) {
    errors.push(`${field} no puede exceder ${rule.maxLength} caracteres`);
  }

  // Validar enum
  if (rule.enum && !rule.enum.includes(value)) {
    errors.push(`${field} debe ser uno de: ${rule.enum.join(', ')}`);
  }

  return {
    isValid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined
  };
};

// Función para validar toda una sección
export const validateSection = (section, data) => {
  const sectionRules = validationRules[section];
  if (!sectionRules) return { isValid: true };

  const errors = {};
  let isValid = true;

  Object.keys(sectionRules).forEach(field => {
    const validation = validateField(section, field, data[field]);
    if (!validation.isValid) {
      errors[field] = validation.errors;
      isValid = false;
    }
  });

  return { isValid, errors: Object.keys(errors).length > 0 ? errors : undefined };
};

// Función para validar todo el formulario
export const validateForm = (formData) => {
  const errors = {};
  let isValid = true;

  // Validar solo campos básicos requeridos
  const basicValidation = {
    inmueble: ['Valor', 'Area', 'Descripcion_General'],
    direccion: ['Direccion'],
    localizacion: ['Localizacion_descripcion', 'Latitud', 'Longitud']
  };

  Object.keys(basicValidation).forEach(section => {
    basicValidation[section].forEach(field => {
      let value;
      if (section === 'inmueble') {
        value = formData[field];
      } else if (section === 'direccion') {
        value = formData.direccion?.[field];
      } else if (section === 'localizacion') {
        value = formData.direccion?.localizacion?.[field];
      }

      const validation = validateField(section, field, value);
      if (!validation.isValid) {
        if (!errors[section]) errors[section] = {};
        errors[section][field] = validation.errors;
        isValid = false;
      }
    });
  });

  return { isValid, errors: Object.keys(errors).length > 0 ? errors : undefined };
};

// Función helper para convertir valores a tipos apropiados
export const sanitizeFormData = (formData) => {
  const sanitized = { ...formData };

  // Convertir números básicos
  if (sanitized.Valor) sanitized.Valor = Number(sanitized.Valor);
  if (sanitized.Area) sanitized.Area = Number(sanitized.Area);
  if (sanitized.Antiguedad) sanitized.Antiguedad = Number(sanitized.Antiguedad);

  return sanitized;
};