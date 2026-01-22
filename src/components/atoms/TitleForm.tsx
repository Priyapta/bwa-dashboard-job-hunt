import React from "react";

interface TitleProps {
  title: string;
  subtitle: string;
}
function TitleForm({ title, subtitle }: TitleProps) {
  return (
    <div>
      <div className="text-3xl font-semibold">{title} </div>
      <div className="text-gray-500">{subtitle}</div>
    </div>
  );
}

export default TitleForm;
