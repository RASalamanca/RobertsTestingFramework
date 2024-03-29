import { RTF } from '../lib/test_framework.js';
import { compareObject } from '../lib/utility_functions.js';

RTF.testSubject(compareObject)
.on({}, {})
.out(true)

.on(
    {a: 1, b: 2}, 
    {a: 1, b: 2}
).out(true)

.on(
    {a: 1, b: 2}, 
    {a: 1, b: 3}
).out(false)

.on(
    {a: 1, b: 2}, 
    {a: 1, b: 2, c: 4}
).out(false)

.on(
    {a: 1, b: 2, c: 4}, 
    {a: 1, b: 2}
).out(false)

.on(
    {a: "1", b:2}, 
    {a: 1, b: 2}
).out(false)

.on(
    {bob: "1", b:2}, 
    {a: "1", b: 2}
).out(false)

.on(
    ["a", "b", 'c'],
    ["a", "2", "f"]
).out(false)

.on(
    {a: 1, b: {c: 2, d: 4}, e: 4},
    {a: 1, b: {c: 2, d: 3}, e: 4}
).out(false)
    
.on(
    {a: [1, 2, 3], b: 4},
    {a: [1, 2, 4], b: 4}
).out(false)

.on(
    {a: [{c: 3, d:4}, {c: 3, d: 4}, {c: 3, d: 4}], b: 2},
    {a: [{c: 6, d:4}, {c: 3, d: 4}, {c: 3, d: 4}], b: 2}
).out(false)

.on(
    {a: {c: {d: 1, e: 2}}, b: {f: 3}},
    {a: {c: {d: 2, e: 2}}, b: {f: 3}}
).out(false)

.on(
    {
        languages: {
            german: {
                speakers: [
                    {
                        name: "bob",
                        age: 46,
                        gender: "male"
                    },
                    {
                        name: "alice",
                        age: 48,
                        gender: 'female'
                    },
                    {
                        name: "charlie",
                        age: 23,
                        gender: 'male'
                    }
                ],
                demand: 'low'
           },
           english: {
                speakers: [
                    {
                        name: "phill",
                        age: 26,
                        gender: 'male'
                    },
                    {
                        name: 'Eustace',
                        age: 25,
                        gender: "male"
                    },
                    {
                        name: 'Camila',
                        age: 35,
                        gender: 'female'
                    }
                ],
                demand: 'high'
           }
        }, 
        applicants: 37
    }, 
    {a: "1", b: 2}
).out(false)

.on(
    {
        languages: {
            german: {
                speakers: [
                    {
                        name: "bob",
                        age: 46,
                        gender: "male"
                    },
                    {
                        name: "alice",
                        age: 48,
                        gender: 'female'
                    },
                    {
                        name: "charlie",
                        age: 23,
                        gender: 'male'
                    }
                ],
                demand: 'low'
           },
           english: {
                speakers: [
                    {
                        name: "phill",
                        age: 26,
                        gender: 'male'
                    },
                    {
                        name: 'Eustace',
                        age: 25,
                        gender: "male"
                    },
                    {
                        name: 'Camila',
                        age: 35,
                        gender: 'female'
                    }
                ],
                demand: 'high'
           }
        }, 
        applicants: 37
    }, 
    {
        languages: {
            german: {
                speakers: [
                    {
                        name: "bob",
                        age: 46,
                        gender: "male"
                    },
                    {
                        name: "alice",
                        age: 48,
                        gender: 'female'
                    },
                    {
                        name: "charlie",
                        age: 23,
                        gender: 'male'
                    }
                ],
                demand: 'low'
           },
           english: {
                speakers: [
                    {
                        name: "phill",
                        age: 26,
                        gender: 'male'
                    },
                    {
                        name: 'Eustace',
                        age: 25,
                        gender: "male"
                    },
                    {
                        name: 'Camila',
                        age: 35,
                        gender: 'female'
                    }
                ],
                    demand: 'high'
           }
        }, 
        applicants: 37
    }
).out(true)

.on(
    {
        languages: {
            german: {
                speakers: [
                    {
                        name: "argyle",
                        age: 46,
                        gender: "male"
                    },
                    {
                        name: "alice",
                        age: 48,
                        gender: 'female'
                    },
                    {
                        name: "charlie",
                        age: 23,
                        gender: 'male'
                    }
                ],
                demand: 'low'
           },
           english: {
                speakers: [
                    {
                        name: "phill",
                        age: 26,
                        gender: 'male'
                    },
                    {
                        name: 'Eustace',
                        age: 25,
                        gender: "male"
                    },
                    {
                        name: 'Camila',
                        age: 35,
                        gender: 'female'
                    }
                ],
                demand: 'high'
           }
        }, 
        applicants: 37
    }, 
    {
        languages: {
            german: {
                speakers: [
                    {
                        name: "bob",
                        age: 46,
                        gender: "male"
                    },
                    {
                        name: "alice",
                        age: 48,
                        gender: 'female'
                    },
                    {
                        name: "charlie",
                        age: 23,
                        gender: 'male'
                    }
                ],
                demand: 'low'
           },
           english: {
                speakers: [
                    {
                        name: "phill",
                        age: 26,
                        gender: 'male'
                    },
                    {
                        name: 'Eustace',
                        age: 25,
                        gender: "male"
                    },
                    {
                        name: 'Camila',
                        age: 35,
                        gender: 'female'
                    }
                ],
                demand: 'high'
           }
        }, 
        applicants: 37
    }
).out(false)

.on(
    {
        languages: {
            german: {
                speakers: [
                    {
                        name: "bob",
                        age: 46,
                        gender: "male"
                    },
                    {
                        name: "charlie",
                        age: 23,
                        gender: 'male'
                    }
                ],
                demand: 'low'
           },
           english: {
                speakers: [
                    {
                        name: "phill",
                        age: 26,
                        gender: 'male'
                    },
                    {
                        name: 'Eustace',
                        age: 25,
                        gender: "male"
                    },
                    {
                        name: 'Camila',
                        age: 35,
                        gender: 'female'
                    }
                ],
                demand: 'high'
           }
        }, 
        applicants: 37
    }, 
    {
        languages: {
            german: {
                speakers: [
                    {
                        name: "bob",
                        age: 46,
                        gender: "male"
                    },
                    {
                        name: "alice",
                        age: 48,
                        gender: 'female'
                    },
                    {
                        name: "charlie",
                        age: 23,
                        gender: 'male'
                    }
                ],
                demand: 'low'
           },
           english: {
                speakers: [
                    {
                        name: "phill",
                        age: 26,
                        gender: 'male'
                    },
                    {
                        name: 'Eustace',
                        age: 25,
                        gender: "male"
                    },
                    {
                        name: 'Camila',
                        age: 35,
                        gender: 'female'
                    }
                ],
                demand: 'high'
           }
        }, 
        applicants: 37
    }
).out(false)

.on(
    {
        languages: {
            german: {
                speakers: [
                    {
                        name: "bob",
                        age: 46,
                        gender: "male"
                    },
                    {
                        name: "alice",
                        age: 48,
                        gender: 'female'
                    },
                    {
                        name: "charlie",
                        age: 23,
                        gender: 'male'
                    }
                ],
                demand: 'low'
           },
           english: {
                speakers: [
                    {
                        name: "phill",
                        age: 26,
                        gender: 'male'
                    },
                    {
                        name: 'Eustace',
                        age: 25,
                        gender: "male"
                    },
                    {
                        name: 'Camila',
                        age: 35,
                        gender: 'female'
                    }
                ],
                demand: 'high'
           }
        }, 
        applicants: 37
    }, 
    {
        languages: {
            german: {
                speakers: [
                    {
                        name: "bob",
                        age: 46,
                        gender: "male"
                    },
                    {
                        name: "alice",
                        age: 48,
                        gender: 'female',
                        height: "2 meters"
                    },
                    {
                        name: "charlie",
                        age: 23,
                        gender: 'male'
                    }
                ],
                demand: 'low'
           },
           english: {
                speakers: [
                    {
                        name: "phill",
                        age: 26,
                        gender: 'male'
                    },
                    {
                        name: 'Eustace',
                        age: 25,
                        gender: "male"
                    },
                    {
                        name: 'Camila',
                        age: 35,
                        gender: 'female'
                    }
                ],
                demand: 'high'
           }
        }, 
        applicants: 37
    }
).out(false);