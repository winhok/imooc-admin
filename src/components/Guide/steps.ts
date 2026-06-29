import type { DriveStep } from 'driver.js'

const steps = (i18n: { t: (key: string) => string }): DriveStep[] => {
  return [
    {
      element: '#guide-start',
      popover: {
        title: i18n.t('msg.guide.guideTitle'),
        description: i18n.t('msg.guide.guideDesc'),
        side: 'bottom',
        align: 'end'
      }
    },
    {
      element: '#guide-hamburger',
      popover: {
        title: i18n.t('msg.guide.hamburgerTitle'),
        description: i18n.t('msg.guide.hamburgerDesc')
      }
    },
    {
      element: '#guide-breadcrumb',
      popover: {
        title: i18n.t('msg.guide.breadcrumbTitle'),
        description: i18n.t('msg.guide.breadcrumbDesc')
      }
    },
    {
      element: '#guide-search',
      popover: {
        title: i18n.t('msg.guide.searchTitle'),
        description: i18n.t('msg.guide.searchDesc'),
        side: 'bottom',
        align: 'end'
      }
    },
    {
      element: '#guide-full',
      popover: {
        title: i18n.t('msg.guide.fullTitle'),
        description: i18n.t('msg.guide.fullDesc'),
        side: 'bottom',
        align: 'end'
      }
    },
    {
      element: '#guide-theme',
      popover: {
        title: i18n.t('msg.guide.themeTitle'),
        description: i18n.t('msg.guide.themeDesc'),
        side: 'bottom',
        align: 'end'
      }
    },
    {
      element: '#guide-lang',
      popover: {
        title: i18n.t('msg.guide.langTitle'),
        description: i18n.t('msg.guide.langDesc'),
        side: 'bottom',
        align: 'end'
      }
    },
    {
      element: '#guide-tags',
      popover: {
        title: i18n.t('msg.guide.tagTitle'),
        description: i18n.t('msg.guide.tagDesc')
      }
    },
    {
      element: '#guide-sidebar',
      popover: {
        title: i18n.t('msg.guide.sidebarTitle'),
        description: i18n.t('msg.guide.sidebarDesc'),
        side: 'right',
        align: 'center'
      }
    }
  ]
}
export default steps
