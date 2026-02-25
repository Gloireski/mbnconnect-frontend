// src/services/api/invitation.api.mock.ts
export const invitationApiMock = {
  verify: async (token: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Token valide simulé
    if (token === 'valid-student-token') {
      return {
        email: 'newstudent@campushub.fr',
        role: 'student',
      };
    }
    
    // Token invalide
    throw {
      response: {
        status: 404,
        data: {
          message: 'Invitation invalide',
        },
      },
    };
  },
};