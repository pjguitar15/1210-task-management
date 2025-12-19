<?php

namespace App\Http;
use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernal extends HttpKernel {
  protected $middleware = [];

  protected $middlewareGroups = [
    'web' => [
     \App\Http\Middleware\VerifytCsrfToken::class,
    ],
    'api' => [
      'cors',
      \Illuminate\Routing\Middleware\SubstituteBindings::class,
    ],
  ];
}