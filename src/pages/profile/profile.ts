import { Options, Vue } from 'vue-class-component';
import { useStore } from '@/store';
import { UserDocuments } from '@/@types';

@Options({})
export default class Profile extends Vue {
  get currentUser(): UserDocuments | null {
    return useStore().getters.getCurrentUser;
  }
}
