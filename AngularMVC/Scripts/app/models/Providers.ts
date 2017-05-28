import { OpaqueToken } from '@angular/core';

export const lookUpTokenList = new OpaqueToken('lookUpTokenList');

export const lookUpTokens = {
    genders: ['Female', 'Male', 'Other'],
    relations: ['Father', 'Mother', 'Grandfather', 'GrandMother', 'Guardian', 'Brother', 'Sister'],
};