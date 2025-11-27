export default function Viewer({ data }) {
  if (!data || !data.parsed_data) {
    return (
      <div className="missing">
        <p>No data loaded. Go back and upload a JSON file.</p>
      </div>
    );
  }

  const parsed = data.parsed_data;

  function Section({ title, children, open = false }) {
    return (
      <details className="section" open={open}>
        <summary>{title}</summary>
        <div className="content">{children}</div>
      </details>
    );
  }



  const companyName =
    parsed.company || parsed.brand || parsed.retailer ||
    (parsed.demo_type ? parsed.demo_type.replace(/\s*Demo$/i, '').trim() : null) ||
    data.filename;

  return (
    <div className="viewer">
      <h1>{companyName}</h1>
      {parsed.demo_type && parsed.demo_type !== companyName && (
        <p className="subtitle">{parsed.demo_type}</p>
      )}
      <p className="source">Source: {data.filename}</p>

      <Section title="Products" open>
        {parsed.products.featured && parsed.products.featured.length > 0 && (
          <div>
            <h3>Featured Products</h3>
            <ul>
              {parsed.products.featured.map((product, i) => (
                <li key={i}>
                  <strong>{product.name}</strong>
                  {product.size && ` - ${product.size}`}
                  {product.upc && ` (UPC: ${product.upc})`}
                  {product.price && ` - ${product.price}`}
                </li>
              ))}
            </ul>
          </div>
        )}

        {parsed.products.alternate && parsed.products.alternate.length > 0 && (
          <div>
            <h3>Alternate Products</h3>
            <ul>
              {parsed.products.alternate.map((product, i) => (
                <li key={i}>
                  <strong>{product.name}</strong>
                  {product.size && ` - ${product.size}`}
                  {product.upc && ` (UPC: ${product.upc})`}
                  {product.price && ` - ${product.price}`}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Section>

      <Section title="Talking Points" open>
        <ul>
          {Array.isArray(parsed.talking_points)
            ? parsed.talking_points.map((point, i) => <li key={i}>{point}</li>)
            : Object.entries(parsed.talking_points).map(([key, points]) => (
                <div key={key}>
                  <h3>{key.replace('_', ' ').toUpperCase()}</h3>
                  <ul>
                    {points.map((point, i) => <li key={i}>{point}</li>)}
                  </ul>
                </div>
              ))
          }
        </ul>
      </Section>

      {parsed.required_materials && <Section title="Required Materials" open>
        {parsed.required_materials.equipment_supplies && (
          <div>
            <h3>Equipment & Supplies</h3>
            <ul>{parsed.required_materials.equipment_supplies.map((item, i) => <li key={i}>{item}</li>)}</ul>
          </div>
        )}

        {parsed.required_materials.sampling_attire && (
          <div>
            <h3>Sampling Attire</h3>
            <ul>{parsed.required_materials.sampling_attire.map((item, i) => <li key={i}>{item}</li>)}</ul>
          </div>
        )}

        {parsed.required_materials.bring_from_home && (
          <div>
            <h3>Bring from Home</h3>
            <ul>{parsed.required_materials.bring_from_home.map((item, i) => <li key={i}>{item}</li>)}</ul>
          </div>
        )}

        {parsed.required_materials.what_to_wear && (
          <div>
            <h3>What to Wear</h3>
            <ul>{parsed.required_materials.what_to_wear.map((item, i) => <li key={i}>{item}</li>)}</ul>
          </div>
        )}

        {parsed.required_materials.goal && (
          <div>
            <h3>Goal</h3>
            <p>{parsed.required_materials.goal}</p>
          </div>
        )}
      </Section>}

      {parsed.note && (
        <Section title="Notes" open>
          <p>{parsed.note}</p>
        </Section>
      )}
    </div>
  );
}
