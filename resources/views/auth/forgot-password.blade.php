{{-- <x-guest-layout>
    <div class="mb-4 text-sm text-gray-600 dark:text-gray-400">
        {{ __('Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.') }}
    </div>

    <!-- Session Status -->
    <x-auth-session-status class="mb-4" :status="session('status')" />

    <form method="POST" action="{{ route('password.email') }}">
        @csrf

        <!-- Email Address -->
        <div>
            <x-input-label for="email" :value="__('Email')" />
            <x-text-input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email')" required autofocus />
            <x-input-error :messages="$errors->get('email')" class="mt-2" />
        </div>

        <div class="flex items-center justify-end mt-4">
            <x-primary-button>
                {{ __('Email Password Reset Link') }}
            </x-primary-button>
        </div>
    </form>
</x-guest-layout> --}}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Forgot Password - {{$settings->site_name}}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        body {
            font-family: 'Inter', sans-serif;
            overflow-x: hidden;
        }
        
        .gradient-bg {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            position: relative;
            overflow: hidden;
        }
        
        .glass-effect {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.18);
        }
        
        .input-group {
            position: relative;
            margin-bottom: 1.5rem;
        }
        
        .input-group input:focus + label,
        .input-group input:not(:placeholder-shown) + label {
            transform: translateY(-25px) scale(0.85);
            color: #667eea;
            background-color: white;
            padding: 0 4px;
            left: 8px; /* Adjusted when label moves up */
        }
        
        .floating-label {
            position: absolute;
            pointer-events: none;
            left: 40px; /* Adjusted to account for icon */
            top: 12px;
            transition: 0.2s ease all;
            color: #9ca3af;
            z-index: 1;
        }
        
        .input-wrapper {
            position: relative;
            display: flex;
            align-items: center;
        }
        
        .email-icon {
            position: absolute;
            left: 12px;
            z-index: 2; /* Higher z-index to ensure it's always visible */
            color: #9ca3af;
            pointer-events: none;
            transition: color 0.2s ease;
        }
        
        .input-wrapper:focus-within .email-icon {
            color: #667eea; /* Change color when input is focused */
        }
        
        .email-input {
            padding-left: 40px;
            width: 100%;
        }
        
        .submit-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            transition: all 0.3s ease;
        }
        
        .submit-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4);
        }
        
        .shape {
            position: absolute;
            z-index: -1;
        }
        
        .shape-1 {
            width: 300px;
            height: 300px;
            border-radius: 50%;
            background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
            top: -150px;
            right: -100px;
            opacity: 0.7;
        }
        
        .shape-2 {
            width: 200px;
            height: 200px;
            border-radius: 50%;
            background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
            bottom: -100px;
            left: -50px;
            opacity: 0.7;
        }
        
        .fade-in {
            animation: fadeIn 0.5s ease-in;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .error-shake {
            animation: shake 0.5s;
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        .custom-input {
            outline: none !important;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
        }
        
        .custom-input:focus {
            outline: none !important;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1) !important;
        }
    </style>
</head>
<body class="gradient-bg min-h-screen flex items-center justify-center p-4">
    <!-- Background Shapes -->
    <div class="shape shape-1"></div>
    <div class="shape shape-2"></div>
    
    <!-- Forgot Password Container -->
    <div class="glass-effect rounded-2xl shadow-2xl w-full max-w-md p-8 fade-in">
        <!-- Logo and Title -->
        <div class="text-center mb-8">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full mb-4">
                <i class="fas fa-key text-white text-2xl"></i>
            </div>
            <h1 class="text-3xl font-bold text-gray-800">Forgot Password?</h1>
        </div>
        
        <!-- Description Message -->
        <div class="mb-6 text-sm text-gray-600 leading-relaxed">
            {{ __('Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.') }}
        </div>
        
        <!-- Session Status -->
        @if(session('status'))
            <div class="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm font-medium fade-in">
                {{ session('status') }}
            </div>
        @endif
        
        <!-- Forgot Password Form -->
        <form method="POST" action="{{ route('password.email') }}">
            @csrf
            
            <!-- Email Address -->
            <div class="input-group">
                <div class="input-wrapper">
                    <input 
                        id="email" 
                        class="custom-input email-input block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200" 
                        type="email" 
                        name="email" 
                        placeholder=" " 
                        value="{{ old('email') }}" 
                        required 
                        autofocus 
                        autocomplete="email" 
                    />
                    <label for="email" class="floating-label">{{ __('Email') }}</label>
                </div>
                @if ($errors->has('email'))
                    <div class="mt-2 p-2 bg-red-100 text-red-700 rounded text-sm font-medium error-shake">
                        {{ $errors->first('email') }}
                    </div>
                @endif
            </div>
            
            <!-- Submit Button -->
            <div class="flex items-center justify-end mt-4">
                <button type="submit" class="submit-btn flex justify-center py-3 px-6 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span class="mr-2">{{ __('Email Password Reset Link') }}</span>
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        </form>
        
        <!-- Back to Login -->
        <div class="mt-6 text-center">
            <p class="text-sm text-gray-600">
                {{ __('Remember your password?') }}
                <a href="{{ route('admin.login') }}" class="font-medium text-indigo-600 hover:text-indigo-800 transition duration-200">
                    {{ __('Back to login') }}
                </a>
            </p>
        </div>
    </div>
</body>
</html>
