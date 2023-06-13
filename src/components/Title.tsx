import { Helmet } from "react-helmet-async";

const DefaultTitle = process.env.REACT_APP_TITLE || "Boilerplate";

interface TitleProps {
  subTitle?: string;
}

export default function Title({ subTitle }: TitleProps) {
  let pageTitle = DefaultTitle;
  if (subTitle) {
    pageTitle = `${subTitle} | ${pageTitle}`;
  }
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{pageTitle}</title>
    </Helmet>
  );
}
