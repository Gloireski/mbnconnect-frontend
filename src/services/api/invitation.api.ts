// src/services/api/invitation.api.ts
import axios from '@/lib/axios';
import { VerifyInvitationResponse } from '@/types/api';

export const invitationApi = {
  verify: async (token: string): Promise<VerifyInvitationResponse> => {
    const response = await axios.post<VerifyInvitationResponse>('/invitations/verify', {
      token,
    });
    return response.data;
  },
};