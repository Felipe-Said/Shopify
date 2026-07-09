import React from 'react';

interface CopyRightProps {
  themeConfig: {
    copyRight: string;
  };
}
export default function CopyRight({
  themeConfig: { copyRight }
}: CopyRightProps) {
  return (
    <div className="copyright">
      <span>{copyRight}</span>
    </div>
  );
}

CopyRight.defaultProps = {
  themeConfig: {
    copyRight: '(c) 2026 Cartify. All Rights Reserved.'
  }
};

export const layout = {
  areaId: 'footerLeft',
  sortOrder: 10
};

export const query = `
  query query {
    themeConfig {
      copyRight
    }
  }
`;
