import React from "react";

export default function ErrorFallBack() {
  return (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                fontSize: '24px',
                color: 'red',
                flexWrap: 'wrap',
                alignContent: 'start',
              }}
            >
              <h1>Something went wrong.</h1>
              <p>We apologize for the inconvenience. Please try again later.</p>
            </div>
          );
}
