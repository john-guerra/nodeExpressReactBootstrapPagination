import React, { useState } from "react";

export default function AboutPage() {
  const [showIt, setShowIt] = useState(false);

  return (
    <div>
      About!
      <div>
        <button className="btn btn-primary" onClick={() => setShowIt(!showIt)}>
          {" "}
          Show it!
        </button>
        {showIt ? <div style={{ "font-size": "52pt" }}>❤️</div> : null}
      </div>
    </div>
  );
}
