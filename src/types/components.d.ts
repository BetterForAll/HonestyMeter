// Type declarations for JavaScript components

declare module '@/components/Autocomplete/Autocomplete' {
  import { FC } from 'react';
  
  interface AutoCompleteProps {
    list?: string[];
    label?: string;
    onChange?: (event: React.SyntheticEvent | null, value?: string) => void;
    value?: string;
    variant?: string;
    onClearClick?: (...args: unknown[]) => void;
  }
  
  const AutoComplete: FC<AutoCompleteProps>;
  export default AutoComplete;
}

declare module '@/components/Layout/Search' {
  import { FC, ChangeEvent } from 'react';
  
  interface SearchProps {
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    onClick?: () => void;
    onClear?: (...args: unknown[]) => void;
    label?: string;
    inputLabel?: string;
    type?: string;
    id?: string;
    position?: 'start' | 'end';
    variant?: string;
    value?: string;
    Icon?: React.ComponentType<{ className?: string }>;
    iconVisibilityToggle?: boolean;
    width?: string;
    mobileWidth?: string;
  }
  
  const Search: FC<SearchProps>;
  export default Search;
}

declare module '@/components/Layout/Pagination' {
  import { FC } from 'react';
  
  interface PaginationProps {
    page: string;
    isFirstPage?: boolean;
    isLastPage?: boolean;
    onClick?: () => void;
    onChange?: () => void;
    isScrollUpIconShown?: boolean;
  }
  
  const Pagination: FC<PaginationProps>;
  export default Pagination;
}

declare module '@/components/ArticleInput' {
  import { FC, ChangeEvent } from 'react';
  
  interface AtricleInputProps {
    article?: string;
    onArticleChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    onGetReport: () => void;
    isUrlProvidedAsInput?: boolean;
    isPublished?: boolean;
    setIsPublished?: (value: boolean) => void;
    isPublishEnabled?: boolean;
  }
  
  const AtricleInput: FC<AtricleInputProps>;
  export default AtricleInput;
}

declare module '@/components/Disclamer' {
  import { FC } from 'react';
  
  interface DisclamerProps {
    isShort?: boolean;
  }
  
  const Disclamer: FC<DisclamerProps>;
  export default Disclamer;
}

declare module '@/components/Share' {
  import { FC } from 'react';
  
  interface ShareProps {
    title?: string;
    url?: string;
    description?: string;
    hashTags?: string[];
    context?: 'app' | 'report';
    showCtaLine1?: boolean;
    showCtaLine2?: boolean;
  }
  
  const Share: FC<ShareProps>;
  export default Share;
}

declare module '@/components/ReportList/ReportList' {
  import { FC } from 'react';
  
  interface ReportListProps {
    reports: unknown[];
    onCardClick: (reportUrl: string) => () => void;
    isLoading?: boolean;
  }
  
  const ReportList: FC<ReportListProps>;
  export default ReportList;
}

declare module '@/components/RatingList/Rating' {
  import { FC } from 'react';
  
  interface RatingProps {
    createdAt?: string;
    items?: string;
    title?: string;
    titleColor?: string;
    Methodology?: FC<{ createdAt?: string }>;
  }
  
  interface RatingListProps {
    ratings: RatingProps[];
  }
  
  export const Rating: FC<RatingProps>;
  export const RatingList: FC<RatingListProps>;
}

declare module '@/components/Methodology/Methodology' {
  import { FC } from 'react';
  
  interface MethodologyProps {
    createdAt?: string;
  }
  
  export const MethodologyPeopleRating: FC<MethodologyProps>;
  export const MethodologySourcesRating: FC<MethodologyProps>;
}

declare module '@/components/Layout/CreateReportButton' {
  import { FC } from 'react';
  
  interface CreateReportButtonProps {
    onClick: () => void;
    isArticleInputShown?: boolean;
  }
  
  const CreateReportButton: FC<CreateReportButtonProps>;
  export default CreateReportButton;
}

declare module '@/components/Layout/BackButton' {
  import { FC } from 'react';
  
  interface BackButtonProps {
    text?: string;
    goTo?: string;
  }
  
  const BackButton: FC<BackButtonProps>;
  export default BackButton;
}

declare module '@/components/Layout/Footer' {
  import { FC } from 'react';
  
  interface FooterProps {
    setCurrentPage?: (...args: unknown[]) => void;
    closeReport?: () => void;
  }
  
  const Footer: FC<FooterProps>;
  export default Footer;
}

declare module '@/components/Layout/DesktopMenu' {
  import { FC } from 'react';
  
  interface MenuProps {
    currentPage?: number | null;
    setCurrentPage?: (...args: unknown[]) => void;
    pageRoutes?: string[];
    closeReport?: () => void;
  }
  
  const Menu: FC<MenuProps>;
  export default Menu;
}

declare module '@/components/Layout/MobileMenu' {
  import { FC } from 'react';
  
  interface MobileMenuProps {
    setCurrentPage?: (...args: unknown[]) => void;
    pageRoutes?: string[];
    closeReport?: () => void;
  }
  
  const MobileMenu: FC<MobileMenuProps>;
  export default MobileMenu;
}

declare module '@/components/Layout/Header' {
  import { FC } from 'react';
  
  const Header: FC;
  export default Header;
}

declare module '@/components/Report/ReportWrapper' {
  import { FC } from 'react';
  
  interface ReportWrapperProps {
    report?: Record<string, unknown>;
    shareLevel?: number;
  }
  
  const ReportWrapper: FC<ReportWrapperProps>;
  export default ReportWrapper;
}

declare module '@/components/Report/ReportLoading' {
  import { FC } from 'react';
  
  const ReportLoading: FC;
  export default ReportLoading;
}
