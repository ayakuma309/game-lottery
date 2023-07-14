import React, { memo } from 'react'


interface PlatFormsProps {
  platforms: {
    id: number;
    name: string;
  }[];
}

const PlatForms:React.FC<PlatFormsProps> = ({platforms}) => {
  return (
    <div>
      {platforms && (
        <div>
          <h2 className="text-2xl font-bold text-center py-2 mb-2 mt-24">
            対応プラットフォーム
          </h2>
          <div className="flex flex-wrap justify-center">
            {platforms.map((platform) => (
              <div key={platform.id} className="flex flex-col justify-center items-center m-2">
                <div className="text-center">
                  {platform.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default memo(PlatForms);
