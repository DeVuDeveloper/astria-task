/*
 * Copyright (C) 2022 - present Instructure, Inc.
 *
 * This file is part of Canvas.
 *
 * Canvas is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, version 3 of the License.
 *
 * Canvas is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License along
 * with this program. If not, see <http://www.gnu.org/licenses/>.
 */

import React from 'react'

/**
 * Provide an iframe for launching an LTI tool directly from the frontend.
 * Works just like all existing usages of the LTI \<iframe\> element, including
 * extracting a ref of the \<iframe\> directly and setting things on it later.
 * Also renders an invisible iframe used for postMessage forwarding when the
 * lti_platform_storage flag is enabled.
 *
 * TODO: include more common usages in this instead of in callers, including:
 * - allow: iframeAllowances
 * - "the following content is partner provided" - both visible and SR-only types
 */
const ToolLaunchIframe = React.forwardRef((props, ref) => {
  const id = 'post_message_forwarding'
  const src = '/post_message_forwarding'
  const sandbox = 'allow-scripts allow-same-origin'
  const style = {display: 'none'}
  const flagEnabled = !!window.ENV?.FEATURES?.lti_platform_storage

  const postMessageForwardingFrame = () => {
    if (!flagEnabled) {
      return null
    }

    return <iframe id={id} name={id} title={id} src={src} sandbox={sandbox} style={style} />
  }

  return (
    <>
      <iframe ref={ref} className="tool_launch" {...props} data-lti-launch="true" />
      {postMessageForwardingFrame()}
    </>
  )
})

export default ToolLaunchIframe