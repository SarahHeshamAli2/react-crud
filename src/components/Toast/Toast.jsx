import React from 'react'

export default function Toast({toast,bg}) {
 return <>
 
 <div
          className={`myToast bg-${bg} text-white px-3 py-2 rounded`}
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: 9999,
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
          }}
        >
          {toast}
        </div>
 </>
}
