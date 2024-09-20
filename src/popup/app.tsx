import React from 'react';
import { createRoot } from 'react-dom/client';
import createRootElement from 'src/common/createRootElement';

const root = createRoot(createRootElement());
root.render(<h1>Hello,world</h1>);
