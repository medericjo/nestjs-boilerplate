import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Session, UserSession, AllowAnonymous, OptionalAuth } from '@thallesp/nestjs-better-auth';

@ApiTags('users')
@Controller('users')
export class UsersController {
  @Get('me')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, description: 'User profile retrieved successfully' })
  async getProfile(@Session() session: UserSession) {
    return { user: session.user };
  }

  @Get('public')
  @AllowAnonymous()
  @ApiOperation({ summary: 'Get public message' })
  @ApiResponse({ status: 200, description: 'Public message' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getPublic() {
    return { message: 'Public route' };
  }

  @Get('optional')
  @OptionalAuth()
  @ApiOperation({ summary: 'Get optional auth status' })
  @ApiResponse({ status: 200, description: 'Optional auth status' })
  async getOptional(@Session() session: UserSession) {
    return { authenticated: !!session };
  }
}