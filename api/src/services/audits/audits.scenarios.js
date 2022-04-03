export const standard = defineScenario({
  audit: {
    one: {
      data: {
        log: 'String',
        user: {
          create: {
            email: 'String6385104',
            username: 'String8865093',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },

    two: {
      data: {
        log: 'String',
        user: {
          create: {
            email: 'String7855577',
            username: 'String9412811',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
  },
})
