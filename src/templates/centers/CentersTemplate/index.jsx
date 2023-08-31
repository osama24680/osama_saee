import Layout from 'src/organisms/Layout';

import SideTabs from 'src/molecules/SideTabs';
import UpperTabs from 'src/molecules/UpperTabs';

import styles from './style.module.css';

const CentersTemplate = ({
  parentTitle,
  pageData,
  pageTitle,
  sideTabs,
  upperTabs,
  tabsTitle,
  children,
}) => {
  return (
    <Layout
      parentTitle={parentTitle}
      pageTitle={pageTitle}
    >
      <div className={styles.CentersTemplate}>
        <SideTabs
          tabs={sideTabs}
          title={tabsTitle}
        />

        <div className={styles.content}>
          {upperTabs && <UpperTabs tabs={upperTabs} />}

          {pageData && (
            <div
              dangerouslySetInnerHTML={{ __html: pageData.content.ar }}
            ></div>
          )}

          {children}
        </div>
      </div>
    </Layout>
  );
};

export default CentersTemplate;
