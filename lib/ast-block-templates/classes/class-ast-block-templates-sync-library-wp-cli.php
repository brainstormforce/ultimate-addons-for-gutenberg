<?php
/**
 * WP CLI
 *
 * 1. Run `wp ast-block-templates sync`       Info.
 *
 * @since 1.0.0
 *
 * @package ast-block-templates
 */

if ( ! class_exists( 'Ast_Block_Templates_Sync_Library_WP_CLI' ) && class_exists( 'WP_CLI_Command' ) ) :

	/**
	 * Ast_Block Templates WP CLI
	 */
	class Ast_Block_Templates_Sync_Library_WP_CLI extends WP_CLI_Command {

		/**
		 * Sync
		 *
		 *  Example: wp ast-block-templates sync
		 *
		 * @since 1.0.0
		 * @param  array $args       Arguments.
		 * @param  array $assoc_args Associated Arguments.
		 * @return void
		 */
		public function sync( $args = array(), $assoc_args = array() ) {

			// Start Sync.
			WP_CLI::line( 'Sync Started' );

			$force = isset( $assoc_args['force'] ) ? true : false;

			if ( ! $force ) {
				// Check sync status.
				Ast_Block_Templates_Sync_Library::get_instance()->check_sync_status();
			}

			// Categories.
			Ast_Block_Templates_Sync_Library::get_instance()->import_categories();

			// Get Blocks Count.
			$total_blocks_requests = Ast_Block_Templates_Sync_Library::get_instance()->get_total_blocks_requests();
			if ( $total_blocks_requests ) {
				for ( $page_no = 1; $page_no <= $total_blocks_requests; $page_no++ ) {

					// Import Blocks.
					Ast_Block_Templates_Sync_Library::get_instance()->import_blocks( $page_no );
					WP_CLI::line( 'BLOCK: Importing blocks from page ' . $page_no );
				}
				WP_CLI::line( 'BLOCK: Importd blocks from ' . $total_blocks_requests . ' pages.' );
			} else {
				WP_CLI::line( 'BLOCK: No block requests found' );
			}

			// Get Sites Count.
			$total_sites_requests = Ast_Block_Templates_Sync_Library::get_instance()->get_total_sites_count();
			if ( $total_sites_requests ) {
				for ( $page_no = 1; $page_no <= $total_sites_requests; $page_no++ ) {

					// Import Sites.
					Ast_Block_Templates_Sync_Library::get_instance()->import_sites( $page_no );
					WP_CLI::line( 'SITE: Importing sites from page ' . $page_no );
				}
				WP_CLI::line( 'SITE: Importd sites from ' . $total_sites_requests . ' pages.' );
			} else {
				WP_CLI::line( 'SITE: No sites requests found' );
			}

			// Sync Complete.
			Ast_Block_Templates_Sync_Library::get_instance()->update_library_complete();

			// Start Sync.
			WP_CLI::line( 'Sync Completed' );
		}
	}

	/**
	 * Add Command
	 */
	WP_CLI::add_command( 'ast-block-templates', 'Ast_Block_Templates_Sync_Library_WP_CLI' );

endif;
