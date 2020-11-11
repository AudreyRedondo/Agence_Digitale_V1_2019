export class Rubrique {
  id: number;
  title: string;
  tooltip: string;
  icon?: string;
  firstSubtitle?: string
  secondSubtitle?: string;
  routerLink: string;
  fragment?: string;

    constructor(id: number, title: string, icon: string, routerLink: string, fragment?: string, tooltip?: string, firstSubtitle?: string, secondSubtitle?: string) {

      this.id = id;
      this.title = title;
      this.tooltip = tooltip;
      this.icon = icon;
      this.firstSubtitle = firstSubtitle;
      this.secondSubtitle = secondSubtitle;
      this.routerLink = routerLink;
      this.fragment = fragment;
  }
};
