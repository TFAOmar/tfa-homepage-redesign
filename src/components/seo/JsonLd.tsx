import { Helmet } from "react-helmet-async";

interface JsonLdProps {
  data: object | object[];
}

/**
 * Safely renders JSON-LD structured data for SEO.
 * Note: The data prop should only contain trusted, developer-defined content.
 * User-generated content should be sanitized before being passed to this component.
 */
const JsonLd = ({ data }: JsonLdProps) => {
  const schemas = Array.isArray(data) ? data : [data];

  // Sanitize JSON strings to prevent XSS via script tag injection
  // This escapes </script> and </style> tags that could break out of the JSON-LD context
  const sanitizedSchemas = schemas.map((schema) => {
    const jsonStr = JSON.stringify(schema);
    // Escape closing script/style tags to prevent breaking out of JSON-LD context
    return jsonStr.replace(/<\/(script|style)/gi, '<\\/$1');
  });

  return (
    <Helmet>
      {sanitizedSchemas.map((sanitizedJson, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: sanitizedJson }}
        />
      ))}
    </Helmet>
  );
};

export default JsonLd;
