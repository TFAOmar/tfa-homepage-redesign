import { Helmet } from "react-helmet-async";

interface JsonLdProps {
  data: object | object[];
}

const JsonLd = ({ data }: JsonLdProps) => {
  const schemas = Array.isArray(data) ? data : [data];

  return (
    <Helmet>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </Helmet>
  );
};

export default JsonLd;
