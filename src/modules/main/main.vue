<template>
  <div class="wrapper">
    <app-header @toggle-menu-sidebar="toggleMenuSidebar"></app-header>
    <menu-sidebar></menu-sidebar>
    <div class="content-wrapper">
      <router-view></router-view>
    </div>
    <app-footer></app-footer>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Header from './header/header.vue';
import MenuSidebar from './menu-sidebar/menu-sidebar.vue';
import Footer from './footer/footer.vue';

@Options({
  components: {
    'app-header': Header,
    'menu-sidebar': MenuSidebar,
    'app-footer': Footer
  }
})
export default class Main extends Vue {
  private appElement: HTMLElement | null = null;

  public mounted(): void {
    this.appElement = document.getElementById('app') as HTMLElement;
    this.appElement.classList.add('sidebar-mini');
    this.appElement.classList.add('layout-fixed');
    console.log((this as any).isMobile());
  }

  public unmounted(): void {
    (this.appElement as HTMLElement).classList.remove('sidebar-mini');
    (this.appElement as HTMLElement).classList.remove('layout-fixed');
  }

  public toggleMenuSidebar(): void {
    const isCollapsed = (this.appElement as HTMLElement).classList.contains(
      'sidebar-collapse'
    );
    if (isCollapsed) {
      (this.appElement as HTMLElement).classList.remove('sidebar-collapse');
    } else {
      (this.appElement as HTMLElement).classList.add('sidebar-collapse');
    }
  }
}
</script>
<style lang="scss"></style>
