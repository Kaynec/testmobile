import { Options, Vue } from 'vue-class-component';
import { useStore } from '@/store';
import { UserDocuments } from '@/@types';
import router from '@/router';

@Options({})
export default class Profile extends Vue {
  get currentUser(): UserDocuments | null {
    return useStore().getters.getCurrentUser;
  }
  updateUser() {
    console.log('salam salam salam salam vsalamsalamsalamsalamsalamsalam');
    router.push({
      name: 'admin/updateProfile',
      params: this.currentUser as any
    });
  }
}
