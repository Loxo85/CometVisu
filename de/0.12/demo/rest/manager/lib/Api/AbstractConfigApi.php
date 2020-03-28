<?php
/**
 * AbstractConfigApi
 *
 * PHP version 7
 *
 * @package OpenAPIServer\Api
 * @author  OpenAPI Generator team
 * @link    https://github.com/openapitools/openapi-generator
 */

/**
 * CometVisu Manager backend
 *
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 * The version of the OpenAPI document: 1.0.0
 * Generated by: https://github.com/openapitools/openapi-generator.git
 */

/**
 * NOTE: This class is auto generated by the openapi generator program.
 * https://github.com/openapitools/openapi-generator
 * Do not edit the class manually.
 */
namespace OpenAPIServer\Api;

use Psr\Container\ContainerInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Message\ResponseInterface;
use Exception;

/**
 * AbstractConfigApi Class Doc Comment
 *
 * @package OpenAPIServer\Api
 * @author  OpenAPI Generator team
 * @link    https://github.com/openapitools/openapi-generator
 */
abstract class AbstractConfigApi
{

    /**
     * @var ContainerInterface Slim app container instance
     */
    protected $container;

    /**
     * Route Controller constructor receives container
     *
     * @param ContainerInterface $container Slim app container instance
     */
    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
    }


    /**
     * POST createHiddenConfig
     * Summary: Creates a new config option
     *
     * @param ServerRequestInterface $request  Request
     * @param ResponseInterface      $response Response
     * @param array|null             $args     Path arguments
     *
     * @return ResponseInterface
     * @throws Exception to force implementation class to override this method
     */
    public function createHiddenConfig(ServerRequestInterface $request, ResponseInterface $response, array $args)
    {
        $section = $args['section'];
        $key = $args['key'];
        $body = $request->getParsedBody();
        $message = "How about implementing createHiddenConfig as a POST method in OpenAPIServer\Api\ConfigApi class?";
        throw new Exception($message);

        return $response->write($message)->withStatus(501);
    }

    /**
     * DELETE deleteHiddenConfig
     * Summary: Delete config option
     *
     * @param ServerRequestInterface $request  Request
     * @param ResponseInterface      $response Response
     * @param array|null             $args     Path arguments
     *
     * @return ResponseInterface
     * @throws Exception to force implementation class to override this method
     */
    public function deleteHiddenConfig(ServerRequestInterface $request, ResponseInterface $response, array $args)
    {
        $section = $args['section'];
        $key = $args['key'];
        $message = "How about implementing deleteHiddenConfig as a DELETE method in OpenAPIServer\Api\ConfigApi class?";
        throw new Exception($message);

        return $response->write($message)->withStatus(501);
    }

    /**
     * GET getHiddenConfig
     * Summary: Provides the value of a config option
     * Output-Formats: [application/json]
     *
     * @param ServerRequestInterface $request  Request
     * @param ResponseInterface      $response Response
     * @param array|null             $args     Path arguments
     *
     * @return ResponseInterface
     * @throws Exception to force implementation class to override this method
     */
    public function getHiddenConfig(ServerRequestInterface $request, ResponseInterface $response, array $args)
    {
        $section = $args['section'];
        $key = $args['key'];
        $message = "How about implementing getHiddenConfig as a GET method in OpenAPIServer\Api\ConfigApi class?";
        throw new Exception($message);

        return $response->write($message)->withStatus(501);
    }

    /**
     * PUT saveHiddenConfig
     * Summary: Save the hidden config
     *
     * @param ServerRequestInterface $request  Request
     * @param ResponseInterface      $response Response
     * @param array|null             $args     Path arguments
     *
     * @return ResponseInterface
     * @throws Exception to force implementation class to override this method
     */
    public function saveHiddenConfig(ServerRequestInterface $request, ResponseInterface $response, array $args)
    {
        $body = $request->getParsedBody();
        $message = "How about implementing saveHiddenConfig as a PUT method in OpenAPIServer\Api\ConfigApi class?";
        throw new Exception($message);

        return $response->write($message)->withStatus(501);
    }

    /**
     * PUT updateHiddenConfig
     * Summary: Changes the value of an existing config option
     *
     * @param ServerRequestInterface $request  Request
     * @param ResponseInterface      $response Response
     * @param array|null             $args     Path arguments
     *
     * @return ResponseInterface
     * @throws Exception to force implementation class to override this method
     */
    public function updateHiddenConfig(ServerRequestInterface $request, ResponseInterface $response, array $args)
    {
        $section = $args['section'];
        $key = $args['key'];
        $body = $request->getParsedBody();
        $message = "How about implementing updateHiddenConfig as a PUT method in OpenAPIServer\Api\ConfigApi class?";
        throw new Exception($message);

        return $response->write($message)->withStatus(501);
    }
}