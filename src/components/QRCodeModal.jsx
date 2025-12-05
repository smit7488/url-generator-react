import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { QRCodeSVG } from 'qrcode.react';

const QRCodeModal = ({ show, onHide, url }) => {
  const [qrColor, setQrColor] = useState('#000000');
  const [uploadedLogo, setUploadedLogo] = useState(null);
  const [borderRadius, setBorderRadius] = useState(10);
  const [processedSVG, setProcessedSVG] = useState(null);
  const [scaleFactor, setScaleFactor] = useState(1);
  const [uploadedImage, setUploadedImage] = useState(null);

  const qrSize = 300;
  const logoMaxSize = 48;
  const paddingSize = logoMaxSize * 1.3;

  // ---------------------------------------------------------
  // 1. Auto-load default logo when modal opens
  // ---------------------------------------------------------
  useEffect(() => {
  if (show) {
    const base = import.meta.env.BASE_URL; // "/url-generator-react/" in your case

    fetch(`${base}hs-icon.svg`)
      .then(res => res.text())
      .then(defaultSVG => setUploadedLogo(defaultSVG))
      .catch(() => {});
  }
}, [show]);

  // ---------------------------------------------------------
  // 2. SVG or Image logo processing
  // ---------------------------------------------------------
  useEffect(() => {
    if (uploadedLogo) {
      if (uploadedLogo.includes("<svg")) {
        let svgContent = uploadedLogo;

        // Remove XML declaration
        if (svgContent.startsWith("<?xml")) {
          svgContent = svgContent.replace(/<\?xml.*?\?>\n?/, "");
        }

        // Extract viewBox and scale to ~48px
        const viewBoxMatch = svgContent.match(/viewBox=["']([\d.\s]+)["']/);
        if (viewBoxMatch) {
          const [, , width, height] = viewBoxMatch[1].split(" ").map(Number);
          if (width && height) {
            const maxDimension = Math.max(width, height);
            const targetSize = 48;
            setScaleFactor(targetSize / maxDimension);
          }
        }

        const svgInnerMatch = svgContent.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
        if (svgInnerMatch) {
          setProcessedSVG(svgInnerMatch[1]);
          setUploadedImage(null);
        }
      } else {
        // PNG / JPG
        setUploadedImage(uploadedLogo);
        setProcessedSVG(null);
      }
    }
  }, [uploadedLogo]);

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setUploadedLogo(e.target.result);
      }
    };

    if (file.type === "image/svg+xml") {
      reader.readAsText(file);
    } else {
      reader.readAsDataURL(file);
    }
  };

  // ---------------------------------------------------------
  // 3. Download PNG
  // ---------------------------------------------------------
  const downloadPNG = () => {
    const svg = document.getElementById('qr-code-svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    canvas.width = qrSize;
    canvas.height = qrSize;

    img.onload = () => {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      const pngFile = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'qr-code.png';
      link.href = pngFile;
      link.click();
    };

    img.src = 'data:image/svg+xml;base64,' +
      btoa(unescape(encodeURIComponent(svgData)));
  };

  // ---------------------------------------------------------
  // 4. Download SVG
  // ---------------------------------------------------------
  const downloadSVG = () => {
    const svg = document.getElementById("qr-code-svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgData], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "qr-code.svg";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-primary-dark">Generate QR Code</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="row">
          {/* QR Code Display */}
          <div className="col-md-6 d-flex justify-content-center align-items-center mb-4 mb-md-0">
            <div className="border rounded p-3" style={{ backgroundColor: 'var(--bg-light)' }}>
              <svg
                id="qr-code-svg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox={`0 0 ${qrSize} ${qrSize}`}
                width={qrSize}
                height={qrSize}
              >
                <QRCodeSVG value={url || 'https://example.com'} size={qrSize} fgColor={qrColor} />

                {(processedSVG || uploadedImage) && (
                  <rect
                    x={(qrSize - paddingSize) / 2}
                    y={(qrSize - paddingSize) / 2}
                    width={paddingSize}
                    height={paddingSize}
                    rx={borderRadius}
                    fill="white"
                    stroke={qrColor}
                    strokeWidth={4}
                  />
                )}

                {processedSVG && (
                  <g
                    transform={`translate(${(qrSize - logoMaxSize) / 2}, ${
                      (qrSize - logoMaxSize) / 2
                    }) scale(${scaleFactor})`}
                    dangerouslySetInnerHTML={{ __html: processedSVG }}
                  />
                )}

                {uploadedImage && (
                  <image
                    href={uploadedImage}
                    x={(qrSize - logoMaxSize) / 2}
                    y={(qrSize - logoMaxSize) / 2}
                    width={logoMaxSize}
                    height={logoMaxSize}
                    preserveAspectRatio="xMidYMid meet"
                  />
                )}
              </svg>
            </div>
          </div>

          {/* Settings Panel */}
          <div className="col-md-6">
            <h6 className="text-primary-dark mb-3">Customization Options</h6>

            {/* Color Picker */}
            <div className="mb-3">
              <label className="form-label fw-bold text-primary-dark">QR Code Color</label>
              <div className="d-flex align-items-center gap-2">
                <input
                  type="color"
                  className="form-control form-control-color"
                  value={qrColor}
                  onChange={(e) => setQrColor(e.target.value)}
                  style={{ width: '60px', height: '40px' }}
                />
                <input type="text" className="form-control flex-grow-1" value={qrColor} readOnly />
              </div>
            </div>

            {/* Logo Upload */}
            <div className="mb-3">
              <label className="form-label fw-bold text-primary-dark">Upload Logo (Optional)</label>
              <input
                type="file"
                className="form-control"
                accept=".svg,.png,.jpg,.jpeg"
                onChange={handleFileUpload}
              />

              {/* Remove Logo Button */}
              {uploadedLogo && (
                <button
                  className="btn btn-sm btn-outline-danger mt-2"
                  onClick={() => {
                    setUploadedLogo(null);
                    setProcessedSVG(null);
                    setUploadedImage(null);
                  }}
                >
                  Remove Logo
                </button>
              )}

              <small className="form-text text-muted d-block mt-1">
                SVG files work best for logos
              </small>
            </div>

            {/* Border Radius */}
            {uploadedLogo && (
              <div className="mb-3">
                <label className="form-label fw-bold text-primary-dark">
                  Logo Background Border Radius: {borderRadius}px
                </label>
                <input
                  type="range"
                  className="form-range"
                  min={0}
                  max={30}
                  value={borderRadius}
                  onChange={(e) => setBorderRadius(Number(e.target.value))}
                />
              </div>
            )}

            {/* URL Display */}
            <div className="mb-3">
              <label className="form-label fw-bold text-primary-dark">URL</label>
              <input
                type="text"
                className="form-control"
                value={url}
                readOnly
                style={{ backgroundColor: 'var(--bg-light)' }}
              />
            </div>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>

        <button className="btn btn-outline-primary" onClick={downloadSVG}>
          Download SVG
        </button>

        <button className="btn btn-primary" onClick={downloadPNG}>
          Download PNG
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default QRCodeModal;
