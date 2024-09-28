/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName simple refresh
 * @FileName footer.tsx
 * @CreateDate  周六  09/21/2024
 * @Description 页脚的超链
 ****************************************************************************/

import React from 'react';

import styles from './index.module.scss';

import { svgImage } from './images/export_svg';
import { getLocaleText } from 'src/common/getLocaleText';

/**
 * 页脚的超链展示
 */
export function Footer(): React.JSX.Element {
  const dataList: { href: string; src: string; title: string }[] = [
    {
      title: '🌟🌟',
      src: svgImage.github,
      href: 'https://github.com/lmssee/edge-reset-new-tab',
    },
    {
      title: getLocaleText('email_feedback'),
      src: svgImage.email,
      href: 'mailto:lmssee@outlook.com',
    },
    {
      title: 'letmiseesee',
      src: svgImage.x,
      href: 'https://x.com/letmiseesee',
    },
    {
      title: getLocaleText('bug_feedback'),
      src: svgImage.feedback,
      href: 'https://github.com/lmssee/edge-reset-new-tab/issues/new',
    },
  ];

  return (
    <div className={styles && styles.footer}>
      {/* <div className="footer"> */}{' '}
      <ul>
        {dataList.map(ele => (
          <li title={ele.title} key={ele.title}>
            <a href={ele.href} target="_blank" rel="noopener noreferrer">
              <img src={ele.src} alt={ele.title} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
