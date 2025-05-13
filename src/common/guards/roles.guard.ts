import {
    Injectable,
    CanActivate,
    ExecutionContext,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserRole } from '../enums/user-role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()]
        );

        if (!requiredRoles || requiredRoles.length === 0) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        // DEBUG: verificamos si llega el user
        console.log('🛡️ RolesGuard - req.user:', user);

        if (!user || !user.role) {
            console.warn('❌ RolesGuard: usuario o rol no definido');
            return false;
        }

        const hasRole = requiredRoles.includes(user.role);
        if (!hasRole) {
            console.warn(`❌ RolesGuard: Rol '${user.role}' no tiene permiso`);
        }

        console.log('📌 requiredRoles:', requiredRoles);
        console.log('📌 user.role:', user.role);

        return hasRole;
    }
}



// import {
//     Injectable,
//     CanActivate,
//     ExecutionContext,
// } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { UserRole } from '../enums/user-role.enum';
// import { ROLES_KEY } from '../decorators/roles.decorator';

// @Injectable()
// export class RolesGuard implements CanActivate {
//     constructor(private reflector: Reflector) { }

//     canActivate(context: ExecutionContext): boolean {
//         const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
//             ROLES_KEY,
//             [context.getHandler(), context.getClass()]
//         );

//         if (!requiredRoles || requiredRoles.length === 0) {
//             return true;
//         }

//         const request = context.switchToHttp().getRequest();
//         const user = request.user;

//         if (!user || !user.role) {
//             console.error('RolesGuard: req.user o req.user.role no está definido');
//             console.debug('Request completo en RolesGuard:', request);
//             throw new Error(
//                 'RolesGuard: Usuario no autenticado correctamente o JWT no contiene el rol.'
//             );
//         }

//         const hasRole = requiredRoles.includes(user.role);
//         if (!hasRole) {
//             console.warn(`RolesGuard: Rol '${user.role}' no autorizado. Se requieren: [${requiredRoles}]`);
//         }

//         return hasRole;
//     }
// }
